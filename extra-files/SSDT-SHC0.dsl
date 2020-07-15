DefinitionBlock ("", "SSDT", 2, "Slav", "SHC0", 0x00000000)
{
    External (_SB_.PCI0.GP13, DeviceObj) // Partial path to controller
    External (_SB_.PCI0.GP13.XHC0, DeviceObj) // Full path to controller
    External (DTGP, MethodObj)

    Scope (\_SB.PCI0.GP13) // Full path to controller
    {
        Scope (XHC0) // Replace with the controller you want to rename
        {
            Method (_STA, 0, NotSerialized)  // _STA: Status
                {
                    If (_OSI ("Darwin"))
                    {
                        Return (Zero)
                    }
                    Else
                    {
                        Return (0x0F)
                    }
                }
        }

        Device (SHC0) // New Controller Name
        {
            Name (_ADR, Zero)  // _ADR: Address
            Method (_DSM, 4, NotSerialized)  // _DSM: Device-Specific Method
            {
                If ((Arg2 == Zero))
                {
                    Return (Buffer (One)
                    {
                         0x03                                             // .
                    })
                }

                Local0 = Package (0x1B){}
                DTGP (Arg0, Arg1, Arg2, Arg3, RefOf (Local0))
                Return (Local0)
            }
            Method (_STA, 0, NotSerialized)  // _STA: Status
                {
                    If (_OSI ("Darwin"))
                    {
                        Return (0x0F)
                    }
                    Else
                    {
                        Return (Zero)
                    }
                }
            
            /* Insert USB ports here if needed
            
            Device (HS01)
            {
                Name (_ADR, 0x01)  // _ADR: Address
            }

            Device (HS02)
            {
                Name (_ADR, 0x02)  // _ADR: Address
            }
            
            */
        }
    }
}