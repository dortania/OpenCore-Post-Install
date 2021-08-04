# Presenting six DIMMs to Mac OS correctly

Populate these items / slots

| Item number | Is Slot | Referenced as |
|-------------|---------|---------------|
| 0 | is slot 8 | referenced as Channel A / DIMM 1 |
| 2 | is slot 10 | referenced as Channel B / DIMM 1 |
| 4 | is slot 12 | referenced as Channel C / DIMM 1 |
| 6 | is slot 5 | referenced as Channel D / DIMM 1 |
| 8 | is slot 3 | referenced as Channel E / DIMM 1 |
| 10 | is slot 1 | referenced as Channel F / DIMM 1 |

---

# Presenting eight DIMMs to Mac OS correctly

Populate these items / slots

| Item number | Is Slot | Referenced as |
|-------------|---------|---------------|
| 0 | is slot 8 | referenced as Channel A / DIMM 1 |
| 1 | is slot 7 | referenced as Channel A / DIMM 2 |
| 2 | is slot 10 | referenced as Channel B / DIMM 1 |
| 3 | is slot 9 | referenced as Channel B / DIMM 2 |
| 6 | is slot 5 | referenced as Channel D / DIMM 1 |
| 7 | is slot 6 | referenced as Channel D / DIMM 2 |
| 8 | is slot 3 | referenced as Channel E / DIMM 1 |
| 9 | is slot 4 | referenced as Channel E / DIMM 2 |

---

# Presenting ten DIMMs to Mac OS correctly

Populate these items / slots

| Item number | Is Slot | Referenced as |
|-------------|---------|---------------|
| 0 | is slot 8 | referenced as Channel A / DIMM 1 |
| 1 | is slot 7 | referenced as Channel A / DIMM 2 |
| 2 | is slot 10 | referenced as Channel B / DIMM 1 |
| 3 | is slot 9 | referenced as Channel B / DIMM 2 |
| 4 | is slot 12 | referenced as Channel C / DIMM 1 |
| 6 | is slot 5 | referenced as Channel D / DIMM 1 |
| 7 | is slot 6 | referenced as Channel D / DIMM 2 |
| 8 | is slot 3 | referenced as Channel E / DIMM 1 |
| 9 | is slot 4 | referenced as Channel E / DIMM 2 |
| 10 | is slot 1 | referenced as Channel F / DIMM 1 |

---

# Presenting twelve DIMMs to Mac OS correctly

Populate these items / slots

| Item number | Is Slot | Referenced as |
|-------------|---------|---------------|
| 0 | is slot 8 | referenced as Channel A / DIMM 1 |
| 1 | is slot 7 | referenced as Channel A / DIMM 2 |
| 2 | is slot 10 | referenced as Channel B / DIMM 1 |
| 3 | is slot 9 | referenced as Channel B / DIMM 2 |
| 4 | is slot 12 | referenced as Channel C / DIMM 1 |
| 5 | is slot 11 | referenced as Channel C / DIMM 2 |
| 6 | is slot 5 | referenced as Channel D / DIMM 1 |
| 7 | is slot 6 | referenced as Channel D / DIMM 2 |
| 8 | is slot 3 | referenced as Channel E / DIMM 1 |
| 9 | is slot 4 | referenced as Channel E / DIMM 2 |
| 10 | is slot 1 | referenced as Channel F / DIMM 1 |
| 11 | is slot 2 | referenced as Channel F / DIMM 2 |

---

# My mainboard only has two physical slots

If your mainboard has only two physical slots you will still need to present four DIMMs to Mac OS. The best way to do this is to halve the sizes of your actual DIMMs and present four smaller values in the OpenCore "virtual slots".

For example, if you have two physical 8GB DIMMs, halve that value to 4GB and present four DIMMs

---

On the [previous page](memory-presenting-four-dimms.md) we learned how to present four DIMMs to Mac OS.
