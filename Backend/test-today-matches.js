require('dotenv').config()
const axios = require('axios')

// Test what data is available for today's matches
async function testTodayMatches() {
    const baseURL = 'http://localhost:8000/api'
    
    console.log('='.repeat(60))
    console.log('TESTING TODAY\'S MATCHES DATA AVAILABILITY')
    console.log('='.repeat(60))
    
    try {
        // Get today's matches
        console.log('1. Getting today\'s matches...')
        const todayRes = await axios.get(`${baseURL}/today`)
        console.log(`✅ Found ${todayRes.data.length} matches today`)
        
        // Find finished matches
        const finishedMatches = todayRes.data.filter(match => 
            match.fixture.status.short === 'FT'
        ).slice(0, 5) // Test first 5 finished matches
        
        console.log(`✅ Found ${finishedMatches.length} finished matches`)
        
        if (finishedMatches.length === 0) {
            console.log('❌ No finished matches found today')
            return
        }
        
        // Test each finished match
        for (let i = 0; i < finishedMatches.length; i++) {
            const match = finishedMatches[i]
            const matchId = match.fixture.id
            
            console.log(`\n${'='.repeat(40)}`)
            console.log(`MATCH ${i + 1}: ${match.teams.home.name} vs ${match.teams.away.name}`)
            console.log(`ID: ${matchId} | League: ${match.league.name}`)
            console.log(`${'='.repeat(40)}`)
            
            try {
                // Test stats
                const statsRes = await axios.get(`${baseURL}/match/${matchId}/stats`)
                const hasStats = Array.isArray(statsRes.data) && 
                                statsRes.data.length === 2 && 
                                statsRes.data[0].statistics && 
                                statsRes.data[0].statistics.length > 0
                
                console.log(`📊 Stats: ${hasStats ? '✅ Available' : '❌ Not available'}`)
                if (hasStats) {
                    console.log(`   - Team 1: ${statsRes.data[0].statistics.length} stats`)
                    console.log(`   - Team 2: ${statsRes.data[1].statistics.length} stats`)
                }
                
                // Test lineups
                const lineupsRes = await axios.get(`${baseURL}/match/${matchId}/lineups`)
                const hasLineups = Array.isArray(lineupsRes.data) && 
                                  lineupsRes.data.length === 2 && 
                                  lineupsRes.data[0].startXI && 
                                  lineupsRes.data[0].startXI.length > 0
                
                const hasFormation = hasLineups && 
                                   lineupsRes.data[0].formation && 
                                   lineupsRes.data[1].formation
                
                console.log(`👥 Lineups: ${hasLineups ? '✅ Available' : '❌ Not available'}`)
                console.log(`🏗️  Formation: ${hasFormation ? '✅ Available' : '❌ Not available'}`)
                
                if (hasLineups) {
                    console.log(`   - Team 1: ${lineupsRes.data[0].formation || 'No formation'} (${lineupsRes.data[0].startXI.length} players)`)
                    console.log(`   - Team 2: ${lineupsRes.data[1].formation || 'No formation'} (${lineupsRes.data[1].startXI.length} players)`)
                }
                
                // Summary
                const dataQuality = hasStats && hasLineups && hasFormation ? 'COMPLETE' :
                                  hasStats && hasLineups ? 'GOOD' :
                                  hasStats || hasLineups ? 'PARTIAL' : 'MINIMAL'
                
                console.log(`📋 Data Quality: ${dataQuality}`)
                console.log(`🔗 Test URL: http://localhost:3000/match/${matchId}`)
                
            } catch (error) {
                console.error(`❌ Error testing match ${matchId}:`, error.message)
            }
        }
        
        console.log(`\n${'='.repeat(60)}`)
        console.log('SUMMARY: Not all finished matches have complete data!')
        console.log('This is normal - it depends on league coverage and API data availability.')
        console.log(`${'='.repeat(60)}`)
        
    } catch (error) {
        console.error('❌ Error:', error.response?.status, error.message)
    }
}

testTodayMatches()