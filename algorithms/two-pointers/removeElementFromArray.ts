// Dat fiind un array de numere întregi nums și un număr întreg val, trebuie să eliminați toate aparițiile lui val in-place.
// Ordinea elementelor poate fi schimbată. Nu contează ce rămâne după elementele valide.
//
// Cerințe
// Modifici array-ul in-place
// Nu aloci alt array
// Returnezi numărul de elemente care nu sunt egale cu val
// Primele k elemente ale array-ului trebuie să conțină elementele valide
// Nu contează ce rămâne după poziția k

function removeElement(nums: number[], val: number): number {
    let k = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val){
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
};