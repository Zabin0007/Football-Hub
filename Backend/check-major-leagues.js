require('dotenv').config()
const axios = require('axios')

async function checkMajorLeagues() {
    const baseURL = 'http://localhost:8000/api'
    
    console.log('='.repeat(60))
    console.log('CHECKING FOR MAJOR LEAGUE MATCHES TODAY')
    console.log('='.repeat(60))
    
    // Major leagues with their IDs
    const majorLeagues = {
        'Premier League': 39,
        'La Liga': 140,
        'Serie A': 135,
        'Bundesliga': 78,
        'Ligue 1': 61,
        'Champions League': 2,
        'Europa League': 3,
        'Copa Libertadores': 13
    }
    
    try {
        // Get today's matches
        console.log('1. Getting today\'s matches...')
        const todayRes = await axios.get(`${baseURL}/today`)
        console.log(`✅ Found ${todayRes.data.length} total matches today`)
        
        // Group matches by league
        const leagueMatches = {}
        todayRes.data.forEach(match => {
            const leagueName = match.league.name
            if (!leagueMatches[leagueName]) {
                leagueMatches[leagueName] = []
            }
            leagueMatches[leagueName].push(match)
        })
        
        console.log(`\n📊 Found matches in ${Object.keys(leagueMatches).length} different leagues/competitions`)
        
        // Check for major leagues
        console.log('\n🏆 MAJOR LEAGUES TODAY:')
        console.log('-'.repeat(40))
        
        let foundMajorLeagues = false
        
        Object.keys(majorLeagues).forEach(leagueName => {
            const matches = todayRes.data.filter(match => 
                match.league.name.toLowerCase().includes(leagueName.toLowerCase()) ||
                match.league.id === majorLeagues[leagueName]
            )
            
            if (matches.length > 0) {
                foundMajorLeagues = true
                console.log(`✅ ${leagueName}: ${matches.length} matches`)
                matches.forEach(match => {
                    console.log(`   - ${match.teams.home.name} vs ${match.teams.away.name} (${match.fixture.status.short})`)
                    console.log(`     ID: ${match.fixture.id}`)
                })
            } else {
                console.log(`❌ ${leagueName}: No matches today`)
            }
        })
        
        if (!foundMajorLeagues) {
            console.log('❌ No major European leagues playing today')
        }
        
        // Show top 10 leagues by match count today
        console.log('\n📈 TOP LEAGUES TODAY (by match count):')
        console.log('-'.repeat(40))
        
        const sortedLeagues = Object.entries(leagueMatches)
            .sort(([,a], [,b]) => b.length - a.length)
            .slice(0, 10)
        
        sortedLeagues.forEach(([leagueName, matches], index) => {
            const finishedCount = matches.filter(m => m.fixture.status.short === 'FT').length
            const liveCount = matches.filter(m => ['1H', '2H', 'HT'].includes(m.fixture.status.short)).length
            const upcomingCount = matches.filter(m => m.fixture.status.short === 'NS').length
            
            console.log(`${index + 1}. ${leagueName}: ${matches.length} matches`)
            console.log(`   📊 Finished: ${finishedCount} | 🔴 Live: ${liveCount} | ⏰ Upcoming: ${upcomingCount}`)
            
            // Show a sample finished match for testing
            const finishedMatch = matches.find(m => m.fixture.status.short === 'FT')
            if (finishedMatch) {
                console.log(`   🔗 Test: http://localhost:3000/match/${finishedMatch.fixture.id}`)
            }
        })
        
        // When do major leagues typically play?
        console.log('\n📅 WHEN MAJOR LEAGUES TYPICALLY PLAY:')
        console.log('-'.repeat(40))
        console.log('🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League: Saturdays & Sundays (+ some weekdays)')
        console.log('🇪🇸 La Liga: Saturdays & Sundays')
        console.log('🇮🇹 Serie A: Saturdays & Sundays')
        console.log('🇩🇪 Bundesliga: Saturdays (+ some Fridays/Sundays)')
        console.log('🇫🇷 Ligue 1: Saturdays & Sundays')
        console.log('🏆 Champions League: Tuesdays & Wednesdays')
        console.log('🏆 Europa League: Thursdays')
        
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
        console.log(`\n📆 Today is ${today}`)
        
        if (['Saturday', 'Sunday'].includes(today)) {
            console.log('✅ Weekend - Higher chance of major league matches!')
        } else if (['Tuesday', 'Wednesday'].includes(today)) {
            console.log('✅ Champions League days - Check for UCL matches!')
        } else if (today === 'Thursday') {
            console.log('✅ Europa League day - Check for UEL matches!')
        } else {
            console.log('ℹ️  Weekday - Fewer major league matches expected')
        }
        
    } catch (error) {
        console.error('❌ Error:', error.response?.status, error.message)
    }
}

checkMajorLeagues()