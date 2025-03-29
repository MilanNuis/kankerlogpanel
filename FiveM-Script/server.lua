local function sendPlayerLog(logData)
    local apiUrl = "https://jouw-website.nl/api/player-logs"

    PerformHttpRequest(apiUrl, function(statusCode, response, headers)
        if statusCode == 200 then
            print("Log succesvol verzonden!")
        else
            print("Fout bij het verzenden van log: " .. statusCode)
        end
    end, 'POST', json.encode(logData), { ['Content-Type'] = 'application/json' })
end

exports('sendPlayerLog', sendPlayerLog)
