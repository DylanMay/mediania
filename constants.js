
module.exports.MinerStatus = {
    Idle: 0,
    Traveling: 1,
    Mining: 2,
    Transfering_minerals_to_planet: 3
}

module.exports.MinerAction = {
    Arrived_at_planet: 1,
    Leaving_planet: 2,
    Traveling_to_asteroid: 3,
    Mining_asteroid: 4,
    Leaving_Asteroid: 5,
    Carry_capacity_full: 6,
    Traveling_back_to_planet: 7,
    Transferring_minerals_to_planet: 8,
    Transferring_done: 9
}

module.exports.CODE = {
    OK: 0,
    PARAM_ERROR: 1,
    DATA_NOT_EXIST: 2,
    EXCEPTION: 3,
}



