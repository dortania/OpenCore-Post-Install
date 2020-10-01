# UEFI Secure Boot

* Based off of CodeRush's [Taming UEFI SecureBoot](https://habr.com/en/post/273497/)


To start setting up UEFI Secure Boot on your machine, we'll first need to ensure a few things:


* Apple Secure Boot Page has been followed correctly
  * This includes DmgLoading and SecureBootModel, ApECID is optional however we strongly encourage you to set this up as well
  * Reminder DmgLoading must be set to either `Signed` or `Disabled`
* You've setup Vaulting
  * Note Vaulting and FileVault are different, FieVault is not require for UEFI Secure Boot however is still strongly encouraged
* Your firmware allows you to add custom Secure Boot keys
  * This guide will focus on AMI, Insyde and Phoneix firmwares mainly
* A Linux install
  * Either a Live USB or already installed, we need this to create our UEFI Keys
* Extra UEFI Tools(See your Package manager on how to obtain)
  * openssl
  * efitools
  * sbsigntool
  

**And a very important reminder**: Setting up UEFI Secure Boot should only be done if you're comfortable working with security keys and terminal. This is not a simple 1 click setup guide. You are responsible for any issues around security keys you face.

## Terminology

::: details Terminology around Secure Boot

| Name | Abbreviation | Explanation |
| :--- | :--- | :--- |
| Platform Key | PK | Key between the platform owner and the firmware |
| Key Exchange Key | KEK | Key between the firmware and the OS |
| Initial Supplier Key | ISK | Root Certificate for the OEM |
| Whitelist Database | db | List of public keys of authorized firmware or software. |
| Blacklist Database | dbx | List of public keys known to correspond to malicious or unauthorized firmware or software. |
| AMI Aptio | APTIO | Firmware developed by [American Megatrends Inc](https://ami.com/en/), used in the majority of consumer desktops and laptops |
| Insyde H2O | iH2O | Firmware developed by [Insyde](https://www.insyde.com/), commonly found in laptops and other OEM systems |
| Phoenix SCT | Phoenix | Firmware developed by [Eltan](https://www.eltan.com/), commonly found in Lenovo laptops |

:::

## Generating our Keys

Here we'll be generating our keys, note that we'll be using `rsa:2048` for the best compatibility as certain older firmwares may not support it. For newer firmwares(ex. Skylake and newer), `rsa:4096` is recommended.

### Platform Key(PK)

This key is used to control access to both the PK variable and the KEK variable, and is seen as the trust relationship between the platform owner and the firmware. 

```sh
openssl req -new -x509 -newkey rsa:2048 -sha256 -days 365 -subj "/CN=Platform Key" -keyout PK.key -out PK.pem
```

### Key Exchange Key(KEK)

```sh
openssl req -new -x509 -newkey rsa:2048 -sha256 -days 365 -subj "/CN=Key Exchange Key" -keyout KEK.key -out KEK.pem
```

### Initial Supplier Key(ISK)

```sh
openssl req -new -x509 -newkey rsa:2048 -sha256 -days 365 -subj "/CN=Image Signing Key" -keyout ISK.key -out ISK.pem
```

## Converting ur keys into ESL Format

Next we'll need to convert the public keys from the PEM format to the ESL format for UEFI Secure Boot to be able to understand:

```sh
# Convert PK
cert-to-efi-sig-list -g "$(uuidgen)" PK.pem PK.esl
# Convert KEK
cert-to-efi-sig-list -g "$(uuidgen)" KEK.pem KEK.esl
# Convert ISK
cert-to-efi-sig-list -g "$(uuidgen)" ISK.pem ISK.esl
```

## Sign our ESL Files

For SecureBoot to work properly, it's necessary that:

* The PK is signed with itself
* The KEK is signed by the PK
* The db and dbx storages are signed with the KEK

At the same time, there cannot be several PKs, however it is possible to have several KEK's in the wild. In these situations, it's highly advised to delete the pre-installed Microsoft key from the KEK for a simple reason - db and dbx can be signed with any key from the KEK storage:

* If the MS key is not removed from there, then Microsoft will be able to manage the contents of db and dbx(i.e. add any new keys or hashes to the trusted download list and remove existing ones from it). 

This can be a bit worrisome so we recommend controlling the keys ourselves and maintaining them as to prevent any unwanted actions from 3rd parties.

However, if you still want to boot Windows with a Microsoft key(ie. to load GOP drivers for external video cards and PXE drivers for external network cards), then you'll need to add another pair of keys to our ISK.esl:

* [Microsoft Windows Production CA 2011](http://go.microsoft.com/fwlink/?LinkID=321192)
  * Signs Microsoft's own boot-loaders 
* [Microsoft UEFI driver signing CA key](http://go.microsoft.com/fwlink/?LinkId=321194)
  * Signs third-party components

### Signing MS's Keys

Optional: If you do not plan to boot Windows, skip to [Signing the PK with itself](#signing-the-pk-with-itself)

```sh
# Create our Microsoft-based Bootloader key
openssl x509 -in MicWinProPCA2011_2011-10-19.crt -inform DER -out MsWin.pem -outform PEM
# Create our UEFI Driver Key
openssl x509 -in MicCorUEFCA2011_2011-06-27.crt -inform DER -out UEFI.pem -outform PEM
# Covert both keys to ESL
cert-to-efi-sig-list -g "$(uuidgen)" MsWin.pem MsWin.esl
cert-to-efi-sig-list -g "$(uuidgen)" UEFI.pem UEFI.esl
# Create our DB file
cat ISK.esl MsWin.esl UEFI.esl > db.esl
```

### Signing the PK with itself

```sh
sign-efi-sig-list -k PK.key -c PK.pem PK PK.esl PK.auth
```


### Signing the KEK with the PK

```sh
sign-efi-sig-list -k PK.key -c PK.pem KEK KEK.esl KEK.auth
```

### Signing the DB with the KEK


```sh
sign-efi-sig-list -k KEK.key -c KEK.pem db db.esl db.auth
```

## Signing OpenCore and other files

Here we'll need to sign all UEFI applications including OpenCore and any .efi files you plan to use. The main ones to keep in mind are:

* BOOTx64.efi(Under EFI/BOOT/)
* Bootstrap.efi(Under EFI/OC/Bootstrap/)
* OpenCore.efi(Under EFI/OC/)
* OpenRuntime.efi(Under EFI/OC/Drivers/)
* HfsPlus.efi(Under EFI/OC/Drivers/)

```sh
sbsign --key ISK.key --cert ISK.pem --output BOOTx64.efi Bootstrap.efi etc.
```

## Creating our USB and adding the keys

Now that we've generated all our keys, we'll now want to add our keys and KeyTool(From efitools) to the root of a USB(preferably FAT32 to ensure the BIOS can read it correctly)

Also ensure you've disabled CSM, as this legacy technology is not compatible with UEFI Secure Boot.

* [AMI AptioV Setup](#ami-aptio-v)
* [Insyde H2O Setup](#insyde-h2o)
* [Phoenix SCT](#phoenix-sct)

To determine what firmware you're running, run dmidecode(You may need to grab this from your Package manager):

```sh
dmidecode -t BIOS
```

### AMI Aptio V



### Insyde H2O



### Phoenix SCT



