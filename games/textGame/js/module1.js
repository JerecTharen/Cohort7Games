


export function totalDamage(hp, armorValue, weaponDmg) {
    let physicalDamage = ((armorValue * 3) - (weaponDmg * 1.25));
    return hp + physicalDamage;
}

