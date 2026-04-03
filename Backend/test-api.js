require('dotenv').config()
const axios = require('axios')

// Test your backend endpoints
async function testBackendEndpoints() {
    const baseURL = 'http://localhost:8000/api'
    const testMatchId = '1535733' // Known working match ID
    
    console.log('Testing your backend endpoints...')
    console.log('Base URL:', baseURL)
    console.log('Test Match ID:', testMatchId)
    
    try {
        // Test 1: Match details
        console.log('\n1. Testing /match/:id endpoint...')
        const matchRes = await axios.get(`${baseURL}/match/${testMatchId}`)
        console.log('✅ Match endpoint working')
        console.log('   Status:', matchRes.data.fixture.status.short)
        console.log('   Teams:', matchRes.data.teams.home.name, 'vs', matchRes.data.teams.away.name)
        
        // Test 2: Match stats
        console.log('\n2. Testing /match/:id/stats endpoint...')
        const statsRes = await axios.get(`${baseURL}/match/${testMatchId}/stats`)
        console.log('   Response type:', Array.isArray(statsRes.data) ? 'Array' : typeof statsRes.data)
        console.log('   Response length:', Array.isArray(statsRes.data) ? statsRes.data.length : 'Not array')
        
        if (Array.isArray(statsRes.data) && statsRes.data.length > 0) {
            console.log('✅ Stats endpoint working')
            statsRes.data.forEach((team, i) => {
                console.log(`   Team ${i + 1}: ${team.team?.name || 'Unknown'}`)
                console.log(`   Statistics: ${team.statistics?.length || 0} items`)
            })
        } else {
            console.log('❌ Stats endpoint returning empty/invalid data')
            console.log('   Raw response:', JSON.stringify(statsRes.data).substring(0, 200))
        }
        
        // Test 3: Match lineups
        console.log('\n3. Testing /match/:id/lineups endpoint...')
        const lineupsRes = await axios.get(`${baseURL}/match/${testMatchId}/lineups`)
        console.log('   Response type:', Array.isArray(lineupsRes.data) ? 'Array' : typeof lineupsRes.data)
        console.log('   Response length:', Array.isArray(lineupsRes.data) ? lineupsRes.data.length : 'Not array')
        
        if (Array.isArray(lineupsRes.data) && lineupsRes.data.length > 0) {
            console.log('✅ Lineups endpoint working')
            lineupsRes.data.forEach((team, i) => {
                console.log(`   Team ${i + 1}: ${team.team?.name || 'Unknown'}`)
                console.log(`   Formation: ${team.formation || 'Not available'}`)
                console.log(`   Starting XI: ${team.startXI?.length || 0} players`)
            })
        } else {
            console.log('❌ Lineups endpoint returning empty/invalid data')
            console.log('   Raw response:', JSON.stringify(lineupsRes.data).substring(0, 200))
        }
        
    } catch (error) {
        console.error('❌ Backend Error:', error.response?.status, error.response?.statusText)
        console.error('   Message:', error.response?.data?.message || error.message)
        console.error('   URL:', error.config?.url)
        
        if (error.code === 'ECONNREFUSED') {
            console.error('   Backend server is not running on port 8000')
        }
    }
}

testBackendEndpoints()