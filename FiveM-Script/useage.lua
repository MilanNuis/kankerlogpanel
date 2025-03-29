local logData = {
    action = 'Login',
    player_identifier = GetPlayerName(source),
    role = 'helper',
    severity = 'info',
    message = 'Player logged in successfully.',.
    data = {
        playerId = source,
    }
}

exports['FiveM-Script']:sendPlayerLog(logData)