require('dotenv').config()
const axios = require('axios')

// Test your backend endpoints with a known working match ID
async function debugMatch() {
    const baseURL = 'http://localhost:8000/api'
    const testMatchId = '592872' // Manchester City vs Evertonn
    
    console.log('='.repeat(60))
    console.log('DEBUGGING MATCH DATA FLOW')
    console.log('='.repeat(60))
    console.log('Match ID:', testMatchId)
    console.log('Backend URL:', baseURL)
    
    try {
        // Test match basic info
        console.log('\n1. MATCH BASIC INFO:')
        console.log('-'.repeat(30))
        const matchRes = await axios.get(`${baseURL}/match/${testMatchId}`)
        console.log('✅ Status:', matchRes.status)
        console.log('✅ Teams:', matchRes.data.teams.home.name, 'vs', matchRes.data.teams.away.name)
        console.log('✅ Match Status:', matchRes.data.fixture.status.short)
        
        // Test stats
        console.log('\n2. MATCH STATISTICS:')
        console.log('-'.repeat(30))
        const statsRes = await axios.get(`${baseURL}/match/${testMatchId}/stats`)
        console.log('✅ Response Type:', Array.isArray(statsRes.data) ? 'Array' : typeof statsRes.data)
        console.log('✅ Teams Count:', statsRes.data.length)
        
        if (statsRes.data.length >= 2) {
            console.log('✅ Team 1:', statsRes.data[0].team.name)
            console.log('   - Statistics Count:', statsRes.data[0].statistics.length)
            console.log('   - First 3 Stats:')
            statsRes.data[0].statistics.slice(0, 3).forEach(stat => {
                console.log(`     * ${stat.type}: ${stat.value}`)
            })
            
            console.log('✅ Team 2:', statsRes.data[1].team.name)
            console.log('   - Statistics Count:', statsRes.data[1].statistics.length)
            console.log('   - First 3 Stats:')
            statsRes.data[1].statistics.slice(0, 3).forEach(stat => {
                console.log(`     * ${stat.type}: ${stat.value}`)
            })
        }
        
        // Test lineups
        console.log('\n3. MATCH LINEUPS:')
        console.log('-'.repeat(30))
        const lineupsRes = await axios.get(`${baseURL}/match/${testMatchId}/lineups`)
        console.log('✅ Response Type:', Array.isArray(lineupsRes.data) ? 'Array' : typeof lineupsRes.data)
        console.log('✅ Teams Count:', lineupsRes.data.length)
        
        if (lineupsRes.data.length >= 2) {
            console.log('✅ Team 1:', lineupsRes.data[0].team.name)
            console.log('   - Formation:', lineupsRes.data[0].formation || 'Not available')
            console.log('   - Starting XI:', lineupsRes.data[0].startXI?.length || 0, 'players')
            console.log('   - Substitutes:', lineupsRes.data[0].substitutes?.length || 0, 'players')
            
            console.log('✅ Team 2:', lineupsRes.data[1].team.name)
            console.log('   - Formation:', lineupsRes.data[1].formation || 'Not available')
            console.log('   - Starting XI:', lineupsRes.data[1].startXI?.length || 0, 'players')
            console.log('   - Substitutes:', lineupsRes.data[1].substitutes?.length || 0, 'players')
            
            // Show sample players
            if (lineupsRes.data[0].startXI && lineupsRes.data[0].startXI.length > 0) {
                console.log('   - Sample Players:')
                lineupsRes.data[0].startXI.slice(0, 3).forEach(p => {
                    console.log(`     * ${p.player.name} (#${p.player.number}, ${p.player.pos})`)
                })
            }
        }
        
        console.log('\n' + '='.repeat(60))
        console.log('✅ ALL ENDPOINTS WORKING CORRECTLY!')
        console.log('✅ Data is available for frontend consumption')
        console.log('='.repeat(60))
        
        console.log('\n🔗 Test this match in your browser:')
        console.log(`   http://localhost:3000/match/${testMatchId}`)
        
    } catch (error) {
        console.error('❌ Error:', error.response?.status, error.response?.statusText)
        console.error('   Message:', error.response?.data?.message || error.message)
        console.error('   URL:', error.config?.url)
    }
}

debugMatch()