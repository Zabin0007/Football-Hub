require('dotenv').config()
const axios = require('axios')

async function debugDates() {
    const baseURL = 'http://localhost:8000/api'
    
    console.log('='.repeat(60))
    console.log('DEBUGGING DATE FILTERING ISSUE')
    console.log('='.repeat(60))
    
    const today = new Date()
    const todayString = today.toISOString().split('T')[0]
    
    console.log('📅 Current Date Info:')
    console.log('   - Today (JS):', today.toLocaleDateString())
    console.log('   - Today (ISO):', todayString)
    console.log('   - Today (Full):', today.toISOString())
    
    try {
        // Get today's matches from your backend
        console.log('\n1. Testing your backend /today endpoint...')
        const todayRes = await axios.get(`${baseURL}/today`)
        console.log(`✅ Found ${todayRes.data.length} matches from backend`)
        
        // Check the first few matches and their dates
        console.log('\n📊 SAMPLE MATCHES AND THEIR DATES:')
        console.log('-'.repeat(50))
        
        const sampleMatches = todayRes.data.slice(0, 10)
        
        sampleMatches.forEach((match, index) => {
            const matchDate = new Date(match.fixture.date)
            const matchDateString = matchDate.toISOString().split('T')[0]
            const isActuallyToday = matchDateString === todayString
            
            console.log(`${index + 1}. ${match.teams.home.name} vs ${match.teams.away.name}`)
            console.log(`   📅 Match Date: ${matchDate.toLocaleDateString()} (${matchDateString})`)
            console.log(`   ⏰ Match Time: ${matchDate.toLocaleTimeString()}`)
            console.log(`   ✅ Actually Today: ${isActuallyToday ? 'YES' : 'NO ❌'}`)
            console.log(`   🏆 League: ${match.league.name}`)
            console.log(`   📊 Status: ${match.fixture.status.long} (${match.fixture.status.short})`)
            
            if (!isActuallyToday) {
                const daysDiff = Math.round((today - matchDate) / (1000 * 60 * 60 * 24))
                console.log(`   ⚠️  This match was ${Math.abs(daysDiff)} days ${daysDiff > 0 ? 'ago' : 'in the future'}!`)
            }
            console.log('')
        })
        
        // Test the external API directly
        console.log('\n2. Testing external API directly...')
        const API = axios.create({
            baseURL: 'https://v3.football.api-sports.io',
            headers: {
                'x-apiSports-Key': process.env.footballAPIKEY
            }
        })
        
        const directRes = await API.get(`/fixtures?date=${todayString}`)
        console.log(`✅ External API returned ${directRes.data.response.length} matches for ${todayString}`)
        
        // Check if external API is returning correct dates
        const directSample = directRes.data.response.slice(0, 5)
        console.log('\n📊 EXTERNAL API SAMPLE:')
        console.log('-'.repeat(30))
        
        directSample.forEach((match, index) => {
            const matchDate = new Date(match.fixture.date)
            const matchDateString = matchDate.toISOString().split('T')[0]
            const isActuallyToday = matchDateString === todayString
            
            console.log(`${index + 1}. ${match.teams.home.name} vs ${match.teams.away.name}`)
            console.log(`   📅 Date: ${matchDateString} (Today: ${isActuallyToday ? 'YES' : 'NO ❌'})`)
        })
        
        // Check for timezone issues
        console.log('\n🌍 TIMEZONE CHECK:')
        console.log('-'.repeat(20))
        console.log('   - Server Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone)
        console.log('   - UTC Offset:', today.getTimezoneOffset() / 60, 'hours')
        
        // Summary
        const wrongDateMatches = todayRes.data.filter(match => {
            const matchDateString = new Date(match.fixture.date).toISOString().split('T')[0]
            return matchDateString !== todayString
        })
        
        console.log('\n📋 SUMMARY:')
        console.log('-'.repeat(15))
        console.log(`   - Total matches: ${todayRes.data.length}`)
        console.log(`   - Actually today: ${todayRes.data.length - wrongDateMatches.length}`)
        console.log(`   - Wrong dates: ${wrongDateMatches.length}`)
        
        if (wrongDateMatches.length > 0) {
            console.log('\n❌ PROBLEM FOUND: Some matches have wrong dates!')
            console.log('   This could be due to:')
            console.log('   1. API returning cached/stale data')
            console.log('   2. Timezone conversion issues')
            console.log('   3. API bug or data inconsistency')
        } else {
            console.log('\n✅ All matches have correct dates')
        }
        
    } catch (error) {
        console.error('❌ Error:', error.response?.status, error.message)
    }
}

debugDates()