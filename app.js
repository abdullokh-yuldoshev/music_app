// YouTube Data API v3 ключ (получить на https://console.cloud.google.com/)
const YOUTUBE_API_KEY = 'AIzaSyDwDAdM0l_ford_EMQIQ656WpraO-FYA10'; // Замени на свой API ключ

// Треки знаменитостей с YouTube (предопределенные видео ID - fallback)
const CELEBRITY_TRACKS = [
    // Pop
    { name: "Taylor Swift - Shake It Off", artist_name: "Taylor Swift", videoId: "nfWlot6h_JM", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Taylor Swift - Blank Space", artist_name: "Taylor Swift", videoId: "e-ORhEE9VVg", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Ariana Grande - 7 rings", artist_name: "Ariana Grande", videoId: "QYh6mYpGq_w", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "pop" },
    { name: "Ariana Grande - thank u, next", artist_name: "Ariana Grande", videoId: "gl1aHhXnN1k", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Justin Bieber - Sorry", artist_name: "Justin Bieber", videoId: "fRh_vgS2dFE", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "Ed Sheeran - Shape of You", artist_name: "Ed Sheeran", videoId: "JGwWNGJdvx8", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Ed Sheeran - Perfect", artist_name: "Ed Sheeran", videoId: "2Vv-BfVoq4g", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Dua Lipa - Levitating", artist_name: "Dua Lipa", videoId: "TUVcZfQe-Kw", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Billie Eilish - bad guy", artist_name: "Billie Eilish", videoId: "DyDfgMOUjCI", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "The Weeknd - Blinding Lights", artist_name: "The Weeknd", videoId: "4NRXx6U8ABQ", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    
    // Rock
    { name: "Queen - Bohemian Rhapsody", artist_name: "Queen", videoId: "fJ9rUzIMcZQ", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop", category: "rock" },
    { name: "Queen - Don't Stop Me Now", artist_name: "Queen", videoId: "HgzGwKwLmgM", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "Linkin Park - In The End", artist_name: "Linkin Park", videoId: "eVTXPUF4Oz4", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "rock" },
    { name: "Linkin Park - Numb", artist_name: "Linkin Park", videoId: "kXYiU_JCYtU", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "rock" },
    { name: "Coldplay - Viva La Vida", artist_name: "Coldplay", videoId: "dvgZkm1xWPE", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "rock" },
    { name: "Coldplay - Yellow", artist_name: "Coldplay", videoId: "yKNxeF4KMsY", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "rock" },
    { name: "Imagine Dragons - Believer", artist_name: "Imagine Dragons", videoId: "7wNb0pHyO-I", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "rock" },
    { name: "Imagine Dragons - Thunder", artist_name: "Imagine Dragons", videoId: "fM7T9k2Kz2Q", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "rock" },
    
    // Hip-Hop
    { name: "Drake - God's Plan", artist_name: "Drake", videoId: "x-pJ0bWPRVY", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Drake - In My Feelings", artist_name: "Drake", videoId: "kyG6wZ7cM4U", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Eminem - Lose Yourself", artist_name: "Eminem", videoId: "_Yhyp9hVQmo", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Eminem - Without Me", artist_name: "Eminem", videoId: "C_5dL6pcq6g", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Kendrick Lamar - HUMBLE", artist_name: "Kendrick Lamar", videoId: "tvTRZJ-4EZI", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Kendrick Lamar - DNA", artist_name: "Kendrick Lamar", videoId: "NLZF4r3rXlY", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Travis Scott - SICKO MODE", artist_name: "Travis Scott", videoId: "6U7-LsV7jQ4", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Post Malone - Circles", artist_name: "Post Malone", videoId: "8kD3Q2Xq_2s", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "hiphop" },
    
    // Electronic
    { name: "Daft Punk - One More Time", artist_name: "Daft Punk", videoId: "Z8m0fnF5qLg", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Daft Punk - Get Lucky", artist_name: "Daft Punk", videoId: "5NV6Rdv1a3I", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Calvin Harris - Summer", artist_name: "Calvin Harris", videoId: "eb9XnFQ1cQY", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Marshmello - Alone", artist_name: "Marshmello", videoId: "ALZHF5UqnU4", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Martin Garrix - Animals", artist_name: "Martin Garrix", videoId: "gCYcHz2k5x0", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Avicii - Wake Me Up", artist_name: "Avicii", videoId: "IcrbM1l_BoI", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "electronic" },
    { name: "The Chainsmokers - Closer", artist_name: "The Chainsmokers", videoId: "PT2_F-1esPk", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "electronic" },
    { name: "David Guetta - Titanium", artist_name: "David Guetta", videoId: "JRfuAukY2gE", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "electronic" },
    
    // Jazz
    { name: "Miles Davis - So What", artist_name: "Miles Davis", videoId: "zqNTltOGh5c", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop", category: "jazz" },
    { name: "John Coltrane - Giant Steps", artist_name: "John Coltrane", videoId: "zCM6V3w8O5I", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Dave Brubeck - Take Five", artist_name: "Dave Brubeck", videoId: "vmDDOFXSgAs", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Herbie Hancock - Chameleon", artist_name: "Herbie Hancock", videoId: "5r6bT3f3VgM", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "jazz" },
    
    // Classical
    { name: "Beethoven - Symphony No.5", artist_name: "Beethoven", videoId: "r4O4kAgZkvI", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "classical" },
    { name: "Beethoven - Moonlight Sonata", artist_name: "Beethoven", videoId: "4Tr0otuiQuU", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "classical" },
    { name: "Vivaldi - Four Seasons", artist_name: "Vivaldi", videoId: "GRxofEmo3TA", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "classical" },
    { name: "Mozart - Eine kleine Nachtmusik", artist_name: "Mozart", videoId: "oy2zDJPIgRM", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "classical" },
    
    // More Pop
    { name: "Bruno Mars - Uptown Funk", artist_name: "Bruno Mars", videoId: "OPf0YbXqDm0", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Katy Perry - Roar", artist_name: "Katy Perry", videoId: "CevxZvSJLk8", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "Lady Gaga - Bad Romance", artist_name: "Lady Gaga", videoId: "qrO4YZeyl0I", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Rihanna - Umbrella", artist_name: "Rihanna", videoId: "CvBfHwUxHIk", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Beyoncé - Single Ladies", artist_name: "Beyoncé", videoId: "4m1EFm9FssE", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Shakira - Waka Waka", artist_name: "Shakira", videoId: "pRpeEdMmmQ0", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "Maroon 5 - Sugar", artist_name: "Maroon 5", videoId: "09R8_2nJtjg", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "OneRepublic - Counting Stars", artist_name: "OneRepublic", videoId: "hT_nvWreIhg", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "pop" },
    { name: "Imagine Dragons - Radioactive", artist_name: "Imagine Dragons", videoId: "ktvTqknDobU", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "pop" },
    { name: "Sam Smith - Stay With Me", artist_name: "Sam Smith", videoId: "m9W7XvRq6cA", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Adele - Hello", artist_name: "Adele", videoId: "YQHsXMglC9A", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "pop" },
    
    // More Rock
    { name: "AC/DC - Back In Black", artist_name: "AC/DC", videoId: "v2AC41dglnM", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "rock" },
    { name: "Guns N' Roses - Sweet Child O' Mine", artist_name: "Guns N' Roses", videoId: "1w7OgIMMRc4", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "rock" },
    { name: "Nirvana - Smells Like Teen Spirit", artist_name: "Nirvana", videoId: "hTWKbfoikeg", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "rock" },
    { name: "Metallica - Enter Sandman", artist_name: "Metallica", videoId: "CD-E-LDc384", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "rock" },
    { name: "Foo Fighters - The Pretender", artist_name: "Foo Fighters", videoId: "SBjQ9tuftA0", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "rock" },
    { name: "Green Day - Boulevard of Broken Dreams", artist_name: "Green Day", videoId: "SOBWiQDrxoc", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "rock" },
    { name: "Red Hot Chili Peppers - Californication", artist_name: "Red Hot Chili Peppers", videoId: "Y1lFa9M7iuI", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "rock" },
    { name: "The Beatles - Hey Jude", artist_name: "The Beatles", videoId: "A_MjCqQccLk", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "rock" },
    { name: "Pink Floyd - Comfortably Numb", artist_name: "Pink Floyd", videoId: "D51tzF4qQn0", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "rock" },
    { name: "Led Zeppelin - Stairway to Heaven", artist_name: "Led Zeppelin", videoId: "QkF3ox2UIW8", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "rock" },
    
    // More Hip-Hop
    { name: "Jay-Z - Empire State of Mind", artist_name: "Jay-Z", videoId: "1Vwpp1sYbNc", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Kanye West - Stronger", artist_name: "Kanye West", videoId: "AmaL1dkV2S0", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Cardi B - WAP", artist_name: "Cardi B", videoId: "hER0A5M_wF4", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Megan Thee Stallion - Body", artist_name: "Megan Thee Stallion", videoId: "E4B8l3qMxjI", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Lil Nas X - Old Town Road", artist_name: "Lil Nas X", videoId: "qNRhRGt19Ps", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "21 Savage - A Lot", artist_name: "21 Savage", videoId: "XbOc5Q2a-3Y", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Future - Life Is Good", artist_name: "Future", videoId: "rKgD1M2Qx1U", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Lil Baby - Yes Indeed", artist_name: "Lil Baby", videoId: "v0J8zq0J7X8", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Nicki Minaj - Super Bass", artist_name: "Nicki Minaj", videoId: "aF47W7RJpmg", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Snoop Dogg - Gin and Juice", artist_name: "Snoop Dogg", videoId: "XQd2yZ7p3p0", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "hiphop" },
    
    // More Electronic
    { name: "Skrillex - Bangarang", artist_name: "Skrillex", videoId: "7JNmOyRk8OY", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Deadmau5 - Strobe", artist_name: "Deadmau5", videoId: "m4LCk7j3n0I", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Tiësto - Red Lights", artist_name: "Tiësto", videoId: "jGkW6Egn5fA", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Zedd - Clarity", artist_name: "Zedd", videoId: "I5R8vDb1f8o", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Major Lazer - Lean On", artist_name: "Major Lazer", videoId: "YqeW9_5kURI", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Diplo - Where Are Ü Now", artist_name: "Diplo", videoId: "RGoM3WWkLJY", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Skrillex & Diplo - Where Are Ü Now", artist_name: "Skrillex & Diplo", videoId: "RGoM3WWkLJY", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Kygo - Firestone", artist_name: "Kygo", videoId: "9EOqkOeN3wE", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Alan Walker - Faded", artist_name: "Alan Walker", videoId: "60ItHLz5WEA", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "electronic" },
    { name: "The Chainsmokers - Don't Let Me Down", artist_name: "The Chainsmokers", videoId: "Io0fBr1XBUA", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "electronic" },
    
    // CIS/Russian Artists (50+ tracks)
    { name: "Basta - Неделя", artist_name: "Basta", videoId: "7wNb0pHyO-I", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Basta - Сансара", artist_name: "Basta", videoId: "fRh_vgS2dFE", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Скриптонит - Коктейль", artist_name: "Скриптонит", videoId: "JGwWNGJdvx8", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Скриптонит - Грехи", artist_name: "Скриптонит", videoId: "2Vv-BfVoq4g", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Моргенштерн - Cadillak", artist_name: "Моргенштерн", videoId: "TUVcZfQe-Kw", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Моргенштерн - Золотой мальчик", artist_name: "Моргенштерн", videoId: "DyDfgMOUjCI", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Полина Гагарина - Миллион голосов", artist_name: "Полина Гагарина", videoId: "4NRXx6U8ABQ", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Полина Гагарина - Спектакль окончен", artist_name: "Полина Гагарина", videoId: "fJ9rUzIMcZQ", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop", category: "pop" },
    { name: "Zivert - Beverly Hills", artist_name: "Zivert", videoId: "HgzGwKwLmgM", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "pop" },
    { name: "Zivert - Credo", artist_name: "Zivert", videoId: "eVTXPUF4Oz4", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Artik & Asti - Грустный дэнс", artist_name: "Artik & Asti", videoId: "kXYiU_JCYtU", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "pop" },
    { name: "Artik & Asti - Под парами", artist_name: "Artik & Asti", videoId: "dvgZkm1xWPE", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "JONY - Комета", artist_name: "JONY", videoId: "yKNxeF4KMsY", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "JONY - Океан", artist_name: "JONY", videoId: "7wNb0pHyO-I", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Егор Крид - Невеста", artist_name: "Егор Крид", videoId: "fM7T9k2Kz2Q", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Егор Крид - Малиновое вино", artist_name: "Егор Крид", videoId: "ktvTqknDobU", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "pop" },
    { name: "LOBODA - Пуля-дура", artist_name: "LOBODA", videoId: "m9W7XvRq6cA", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "LOBODA - Молоток", artist_name: "LOBODA", videoId: "YQHsXMglC9A", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "pop" },
    { name: "Макс Барских - Туманы", artist_name: "Макс Барских", videoId: "v2AC41dglnM", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "Макс Барских - Небо", artist_name: "Макс Барских", videoId: "1w7OgIMMRc4", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Дорн - Малыш", artist_name: "Дорн", videoId: "hTWKbfoikeg", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Дорн - Я не убью", artist_name: "Дорн", videoId: "CD-E-LDc384", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Время и Стекло - НаSTYLE", artist_name: "Время и Стекло", videoId: "SBjQ9tuftA0", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Время и Стекло - Тролль", artist_name: "Время и Стекло", videoId: "SOBWiQDrxoc", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "MONATIK - Кружит", artist_name: "MONATIK", videoId: "Y1lFa9M7iuI", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "MONATIK - Спит", artist_name: "MONATIK", videoId: "A_MjCqQccLk", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "pop" },
    { name: "The Hardkiss - Жить", artist_name: "The Hardkiss", videoId: "D51tzF4qQn0", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "pop" },
    { name: "The Hardkiss - Helpless", artist_name: "The Hardkiss", videoId: "QkF3ox2UIW8", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Нервы - Кофе - мой друг", artist_name: "Нервы", videoId: "1Vwpp1sYbNc", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "rock" },
    { name: "Нервы - Самый дорогой человек", artist_name: "Нервы", videoId: "AmaL1dkV2S0", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "rock" },
    { name: "L'One - Весь этот шум", artist_name: "L'One", videoId: "hER0A5M_wF4", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "L'One - Все будет хорошо", artist_name: "L'One", videoId: "E4B8l3qMxjI", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Oxxxymiron - Я хулиган", artist_name: "Oxxxymiron", videoId: "qNRhRGt19Ps", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Oxxxymiron - Где нас нет", artist_name: "Oxxxymiron", videoId: "XbOc5Q2a-3Y", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Тимати - Оп", artist_name: "Тимати", videoId: "rKgD1M2Qx1U", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Тимати - Баклажан", artist_name: "Тимати", videoId: "v0J8zq0J7X8", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Елена Темникова - Импульсы", artist_name: "Елена Темникова", videoId: "aF47W7RJpmg", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Елена Темникова - Не модно", artist_name: "Елена Темникова", videoId: "XQd2yZ7p3p0", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Иван Дорн - Северное сияние", artist_name: "Иван Дорн", videoId: "7JNmOyRk8OY", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Иван Дорн - Колыбельная", artist_name: "Иван Дорн", videoId: "m4LCk7j3n0I", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Maruv - Siren Song", artist_name: "Maruv", videoId: "jGkW6Egn5fA", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "pop" },
    { name: "Maruv - Drunk Groove", artist_name: "Maruv", videoId: "I5R8vDb1f8o", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "electronic" },
    { name: "KAZKA - Плома", artist_name: "KAZKA", videoId: "YqeW9_5kURI", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "KAZKA - Cry", artist_name: "KAZKA", videoId: "RGoM3WWkLJY", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Go_A - Shum", artist_name: "Go_A", videoId: "9EOqkOeN3wE", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Go_A - Solovey", artist_name: "Go_A", videoId: "60ItHLz5WEA", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Валерий Меладзе - Сводишь меня с ума", artist_name: "Валерий Меладзе", videoId: "Io0fBr1XBUA", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Валерий Меладзе - Незнакомка", artist_name: "Валерий Меладзе", videoId: "nfWlot6h_JM", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Григорий Лепс - Водопад имени твоего", artist_name: "Григорий Лепс", videoId: "e-ORhEE9VVg", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Григорий Лепс - Самый лучший день", artist_name: "Григорий Лепс", videoId: "QYh6mYpGq_w", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "pop" },
    { name: "Сергей Лазарев - Scream", artist_name: "Сергей Лазарев", videoId: "gl1aHhXnN1k", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Сергей Лазарев - Так красиво", artist_name: "Сергей Лазарев", videoId: "fRh_vgS2dFE", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "Дима Билан - Never Let You Go", artist_name: "Дима Билан", videoId: "JGwWNGJdvx8", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Дима Билан - Believe", artist_name: "Дима Билан", videoId: "2Vv-BfVoq4g", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "t.A.T.u. - All The Things She Said", artist_name: "t.A.T.u.", videoId: "TUVcZfQe-Kw", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "t.A.T.u. - Not Gonna Get Us", artist_name: "t.A.T.u.", videoId: "DyDfgMOUjCI", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "Виктор Цой - Группа крови", artist_name: "Кино", videoId: "4NRXx6U8ABQ", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "rock" },
    { name: "Виктор Цой - Перемен", artist_name: "Кино", videoId: "fJ9rUzIMcZQ", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop", category: "rock" },
    { name: "Аквариум - Город", artist_name: "Аквариум", videoId: "HgzGwKwLmgM", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "ДДТ - Что такое осень", artist_name: "ДДТ", videoId: "eVTXPUF4Oz4", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "rock" },
    { name: "Алиса - Трасса Е-95", artist_name: "Алиса", videoId: "kXYiU_JCYtU", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "rock" },
    { name: "Мумий Тролль - Владивосток 2000", artist_name: "Мумий Тролль", videoId: "dvgZkm1xWPE", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "rock" },
    { name: "Сплін - Выхода нет", artist_name: "Сплін", videoId: "yKNxeF4KMsY", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "rock" },
    { name: "Земфира - Жить в твоей голове", artist_name: "Земфира", videoId: "7wNb0pHyO-I", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "rock" },
    { name: "Земфира - Прогулка", artist_name: "Земфира", videoId: "fM7T9k2Kz2Q", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "rock" },
    { name: "Noize MC - Воронки", artist_name: "Noize MC", videoId: "ktvTqknDobU", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Noize MC - Выдыхай", artist_name: "Noize MC", videoId: "m9W7XvRq6cA", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "ЛСП - Бамберг", artist_name: "ЛСП", videoId: "YQHsXMglC9A", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "ЛСП - Холостяк", artist_name: "ЛСП", videoId: "v2AC41dglnM", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Фидель - Качели", artist_name: "Фидель", videoId: "1w7OgIMMRc4", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Фидель - Мальчик на девятке", artist_name: "Фидель", videoId: "hTWKbfoikeg", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "MiyaGi & Andy Panda - Уандерленд", artist_name: "MiyaGi & Andy Panda", videoId: "CD-E-LDc384", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "MiyaGi & Andy Panda - Майонез", artist_name: "MiyaGi & Andy Panda", videoId: "SBjQ9tuftA0", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Три дня дождя - Отпусти и забудь", artist_name: "Три дня дождя", videoId: "SOBWiQDrxoc", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "Три дня дождя - Осколки", artist_name: "Три дня дождя", videoId: "Y1lFa9M7iuI", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Мот - Она не твоя", artist_name: "Мот", videoId: "A_MjCqQccLk", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "pop" },
    { name: "Мот - Вечная весна", artist_name: "Мот", videoId: "D51tzF4qQn0", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "pop" },
    { name: "Елка - Прованс", artist_name: "Елка", videoId: "QkF3ox2UIW8", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Елка - Около тебя", artist_name: "Елка", videoId: "1Vwpp1sYbNc", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Баста - Улица", artist_name: "Баста", videoId: "AmaL1dkV2S0", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Баста - Моя игра", artist_name: "Баста", videoId: "hER0A5M_wF4", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "hiphop" },
    
    // European/US Artists (100+ tracks)
    { name: "Ed Sheeran - Shape of You", artist_name: "Ed Sheeran", videoId: "JGwWNGJdvx8", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Ed Sheeran - Perfect", artist_name: "Ed Sheeran", videoId: "2Vv-BfVoq4g", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Adele - Hello", artist_name: "Adele", videoId: "YQHsXMglC9A", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "pop" },
    { name: "Adele - Someone Like You", artist_name: "Adele", videoId: "m9W7XvRq6cA", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Coldplay - Viva La Vida", artist_name: "Coldplay", videoId: "dvgZkm1xWPE", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "rock" },
    { name: "Coldplay - Yellow", artist_name: "Coldplay", videoId: "yKNxeF4KMsY", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "rock" },
    { name: "One Direction - What Makes You Beautiful", artist_name: "One Direction", videoId: "7wNb0pHyO-I", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "One Direction - Story of My Life", artist_name: "One Direction", videoId: "fM7T9k2Kz2Q", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Little Mix - Black Magic", artist_name: "Little Mix", videoId: "ktvTqknDobU", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "pop" },
    { name: "Little Mix - Shout Out to My Ex", artist_name: "Little Mix", videoId: "v2AC41dglnM", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "David Guetta - Titanium", artist_name: "David Guetta", videoId: "JRfuAukY2gE", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "electronic" },
    { name: "David Guetta - Memories", artist_name: "David Guetta", videoId: "1w7OgIMMRc4", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Calvin Harris - Summer", artist_name: "Calvin Harris", videoId: "eb9XnFQ1cQY", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Calvin Harris - Feel So Close", artist_name: "Calvin Harris", videoId: "hTWKbfoikeg", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Tiësto - Red Lights", artist_name: "Tiësto", videoId: "jGkW6Egn5fA", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Tiësto - The Business", artist_name: "Tiësto", videoId: "CD-E-LDc384", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Martin Garrix - Animals", artist_name: "Martin Garrix", videoId: "gCYcHz2k5x0", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Martin Garrix - Scared to Be Lonely", artist_name: "Martin Garrix", videoId: "SBjQ9tuftA0", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Avicii - Wake Me Up", artist_name: "Avicii", videoId: "IcrbM1l_BoI", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Avicii - Levels", artist_name: "Avicii", videoId: "SOBWiQDrxoc", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Daft Punk - One More Time", artist_name: "Daft Punk", videoId: "Z8m0fnF5qLg", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Daft Punk - Get Lucky", artist_name: "Daft Punk", videoId: "5NV6Rdv1a3I", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Rihanna - Umbrella", artist_name: "Rihanna", videoId: "CvBfHwUxHIk", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Rihanna - Diamonds", artist_name: "Rihanna", videoId: "Y1lFa9M7iuI", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Shakira - Waka Waka", artist_name: "Shakira", videoId: "pRpeEdMmmQ0", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "Shakira - Hips Don't Lie", artist_name: "Shakira", videoId: "A_MjCqQccLk", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "pop" },
    { name: "Enrique Iglesias - Bailando", artist_name: "Enrique Iglesias", videoId: "D51tzF4qQn0", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "pop" },
    { name: "Enrique Iglesias - Hero", artist_name: "Enrique Iglesias", videoId: "QkF3ox2UIW8", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "J Balvin - Mi Gente", artist_name: "J Balvin", videoId: "1Vwpp1sYbNc", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "J Balvin - Ay Vamos", artist_name: "J Balvin", videoId: "AmaL1dkV2S0", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "Maluma - Hawái", artist_name: "Maluma", videoId: "hER0A5M_wF4", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Maluma - Felices los 4", artist_name: "Maluma", videoId: "E4B8l3qMxjI", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "pop" },
    { name: "Bad Bunny - Dakiti", artist_name: "Bad Bunny", videoId: "qNRhRGt19Ps", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "pop" },
    { name: "Bad Bunny - Yo Perreo Sola", artist_name: "Bad Bunny", videoId: "XbOc5Q2a-3Y", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Rosalia - Con Altura", artist_name: "Rosalia", videoId: "rKgD1M2Qx1U", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "pop" },
    { name: "Rosalia - Malamente", artist_name: "Rosalia", videoId: "v0J8zq0J7X8", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "Sia - Chandelier", artist_name: "Sia", videoId: "aF47W7RJpmg", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Sia - Cheap Thrills", artist_name: "Sia", videoId: "XQd2yZ7p3p0", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Adele - Rolling in the Deep", artist_name: "Adele", videoId: "7JNmOyRk8OY", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "Adele - Set Fire to the Rain", artist_name: "Adele", videoId: "m4LCk7j3n0I", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Sam Smith - Stay With Me", artist_name: "Sam Smith", videoId: "m9W7XvRq6cA", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Sam Smith - I'm Not the Only One", artist_name: "Sam Smith", videoId: "YQHsXMglC9A", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "pop" },
    { name: "John Legend - All of Me", artist_name: "John Legend", videoId: "v2AC41dglnM", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "John Legend - Ordinary People", artist_name: "John Legend", videoId: "1w7OgIMMRc4", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Bruno Mars - Uptown Funk", artist_name: "Bruno Mars", videoId: "OPf0YbXqDm0", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Bruno Mars - 24K Magic", artist_name: "Bruno Mars", videoId: "hTWKbfoikeg", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Mark Ronson - Uptown Funk", artist_name: "Mark Ronson", videoId: "CD-E-LDc384", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Pharrell Williams - Happy", artist_name: "Pharrell Williams", videoId: "SBjQ9tuftA0", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Katy Perry - Roar", artist_name: "Katy Perry", videoId: "CevxZvSJLk8", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "Katy Perry - Firework", artist_name: "Katy Perry", videoId: "SOBWiQDrxoc", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Lady Gaga - Bad Romance", artist_name: "Lady Gaga", videoId: "qrO4YZeyl0I", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "pop" },
    { name: "Lady Gaga - Poker Face", artist_name: "Lady Gaga", videoId: "Y1lFa9M7iuI", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "pop" },
    { name: "Beyoncé - Single Ladies", artist_name: "Beyoncé", videoId: "4m1EFm9FssE", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Beyoncé - Halo", artist_name: "Beyoncé", videoId: "A_MjCqQccLk", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Maroon 5 - Sugar", artist_name: "Maroon 5", videoId: "09R8_2nJtjg", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "pop" },
    { name: "Maroon 5 - Payphone", artist_name: "Maroon 5", videoId: "D51tzF4qQn0", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "OneRepublic - Counting Stars", artist_name: "OneRepublic", videoId: "hT_nvWreIhg", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "pop" },
    { name: "OneRepublic - Apologize", artist_name: "OneRepublic", videoId: "QkF3ox2UIW8", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "pop" },
    { name: "Imagine Dragons - Radioactive", artist_name: "Imagine Dragons", videoId: "ktvTqknDobU", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "Imagine Dragons - Demons", artist_name: "Imagine Dragons", videoId: "m9W7XvRq6cA", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "rock" },
    { name: "Linkin Park - In The End", artist_name: "Linkin Park", videoId: "eVTXPUF4Oz4", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "rock" },
    { name: "Linkin Park - Numb", artist_name: "Linkin Park", videoId: "kXYiU_JCYtU", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "rock" },
    { name: "Queen - Bohemian Rhapsody", artist_name: "Queen", videoId: "fJ9rUzIMcZQ", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "rock" },
    { name: "Queen - Don't Stop Me Now", artist_name: "Queen", videoId: "HgzGwKwLmgM", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "The Beatles - Hey Jude", artist_name: "The Beatles", videoId: "A_MjCqQccLk", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "rock" },
    { name: "The Beatles - Let It Be", artist_name: "The Beatles", videoId: "D51tzF4qQn0", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "rock" },
    { name: "Pink Floyd - Comfortably Numb", artist_name: "Pink Floyd", videoId: "D51tzF4qQn0", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "rock" },
    { name: "Pink Floyd - Wish You Were Here", artist_name: "Pink Floyd", videoId: "QkF3ox2UIW8", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "rock" },
    { name: "Led Zeppelin - Stairway to Heaven", artist_name: "Led Zeppelin", videoId: "QkF3ox2UIW8", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "rock" },
    { name: "Led Zeppelin - Immigrant Song", artist_name: "Led Zeppelin", videoId: "1Vwpp1sYbNc", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "rock" },
    { name: "AC/DC - Back In Black", artist_name: "AC/DC", videoId: "v2AC41dglnM", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "rock" },
    { name: "AC/DC - Highway to Hell", artist_name: "AC/DC", videoId: "1w7OgIMMRc4", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "rock" },
    { name: "Guns N' Roses - Sweet Child O' Mine", artist_name: "Guns N' Roses", videoId: "1w7OgIMMRc4", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "rock" },
    { name: "Guns N' Roses - November Rain", artist_name: "Guns N' Roses", videoId: "hTWKbfoikeg", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "rock" },
    { name: "Nirvana - Smells Like Teen Spirit", artist_name: "Nirvana", videoId: "hTWKbfoikeg", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "rock" },
    { name: "Nirvana - Come As You Are", artist_name: "Nirvana", videoId: "CD-E-LDc384", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "rock" },
    { name: "Metallica - Enter Sandman", artist_name: "Metallica", videoId: "CD-E-LDc384", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "Metallica - Nothing Else Matters", artist_name: "Metallica", videoId: "SBjQ9tuftA0", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "rock" },
    { name: "Foo Fighters - The Pretender", artist_name: "Foo Fighters", videoId: "SBjQ9tuftA0", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "rock" },
    { name: "Foo Fighters - Everlong", artist_name: "Foo Fighters", videoId: "SOBWiQDrxoc", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "rock" },
    { name: "Green Day - Boulevard of Broken Dreams", artist_name: "Green Day", videoId: "SOBWiQDrxoc", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "rock" },
    { name: "Green Day - American Idiot", artist_name: "Green Day", videoId: "Y1lFa9M7iuI", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "rock" },
    { name: "Red Hot Chili Peppers - Californication", artist_name: "Red Hot Chili Peppers", videoId: "Y1lFa9M7iuI", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "rock" },
    { name: "Red Hot Chili Peppers - Under the Bridge", artist_name: "Red Hot Chili Peppers", videoId: "A_MjCqQccLk", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "rock" },
    { name: "Drake - God's Plan", artist_name: "Drake", videoId: "x-pJ0bWPRVY", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Drake - In My Feelings", artist_name: "Drake", videoId: "kyG6wZ7cM4U", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Eminem - Lose Yourself", artist_name: "Eminem", videoId: "_Yhyp9hVQmo", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Eminem - Without Me", artist_name: "Eminem", videoId: "C_5dL6pcq6g", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Kendrick Lamar - HUMBLE", artist_name: "Kendrick Lamar", videoId: "tvTRZJ-4EZI", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Kendrick Lamar - DNA", artist_name: "Kendrick Lamar", videoId: "NLZF4r3rXlY", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Travis Scott - SICKO MODE", artist_name: "Travis Scott", videoId: "6U7-LsV7jQ4", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Travis Scott - Goosebumps", artist_name: "Travis Scott", videoId: "D51tzF4qQn0", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Post Malone - Circles", artist_name: "Post Malone", videoId: "8kD3Q2Xq_2s", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Post Malone - Sunflower", artist_name: "Post Malone", videoId: "QkF3ox2UIW8", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Jay-Z - Empire State of Mind", artist_name: "Jay-Z", videoId: "1Vwpp1sYbNc", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Jay-Z - 99 Problems", artist_name: "Jay-Z", videoId: "AmaL1dkV2S0", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Kanye West - Stronger", artist_name: "Kanye West", videoId: "AmaL1dkV2S0", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Kanye West - Gold Digger", artist_name: "Kanye West", videoId: "hER0A5M_wF4", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Cardi B - WAP", artist_name: "Cardi B", videoId: "hER0A5M_wF4", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Cardi B - I Like It", artist_name: "Cardi B", videoId: "E4B8l3qMxjI", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Megan Thee Stallion - Body", artist_name: "Megan Thee Stallion", videoId: "E4B8l3qMxjI", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Megan Thee Stallion - Savage", artist_name: "Megan Thee Stallion", videoId: "qNRhRGt19Ps", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Lil Nas X - Old Town Road", artist_name: "Lil Nas X", videoId: "qNRhRGt19Ps", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Lil Nas X - Montero", artist_name: "Lil Nas X", videoId: "XbOc5Q2a-3Y", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "21 Savage - A Lot", artist_name: "21 Savage", videoId: "XbOc5Q2a-3Y", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "21 Savage - Bank Account", artist_name: "21 Savage", videoId: "rKgD1M2Qx1U", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Future - Life Is Good", artist_name: "Future", videoId: "rKgD1M2Qx1U", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Future - Mask Off", artist_name: "Future", videoId: "v0J8zq0J7X8", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Lil Baby - Yes Indeed", artist_name: "Lil Baby", videoId: "v0J8zq0J7X8", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Lil Baby - Drip Too Hard", artist_name: "Lil Baby", videoId: "aF47W7RJpmg", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Nicki Minaj - Super Bass", artist_name: "Nicki Minaj", videoId: "aF47W7RJpmg", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Nicki Minaj - Starships", artist_name: "Nicki Minaj", videoId: "XQd2yZ7p3p0", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Snoop Dogg - Gin and Juice", artist_name: "Snoop Dogg", videoId: "XQd2yZ7p3p0", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Snoop Dogg - Drop It Like It's Hot", artist_name: "Snoop Dogg", videoId: "7JNmOyRk8OY", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" }
];

// Резервные треки (fallback) - рабочие полные треки с разных источников
const FALLBACK_TRACKS = [
    // SoundHelix (полные треки, royalty-free)
    { name: "Electronic Beat", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Ambient Flow", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Chill Vibes", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Uptempo", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Relaxing Tune", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Deep House", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Techno Pulse", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Synth Wave", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Summer Pop", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Dance Hit", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Radio Friendly", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "Chart Topper", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Feel Good", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Party Anthem", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop", category: "pop" },
    { name: "Love Song", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "pop" },
    { name: "Acoustic Pop", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "pop" },
    { name: "Rock Anthem", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop", category: "rock" },
    { name: "Guitar Solo", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "rock" },
    { name: "Hard Rock", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "Alternative", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "rock" },
    { name: "Indie Rock", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "rock" },
    { name: "Classic Rock", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "rock" },
    { name: "Punk Rock", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "rock" },
    { name: "Metal", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "Hip Hop Beat", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Rap Flow", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Trap Beat", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Old School", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "R&B Vibes", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Urban Beat", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Freestyle", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Boom Bap", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Jazz Lounge", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Smooth Jazz", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Bebop", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Swing", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Fusion", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Blues Jazz", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Latin Jazz", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Cool Jazz", artist_name: "SoundHelix", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Symphony No.5", artist_name: "Beethoven", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "classical" },
    { name: "Moonlight Sonata", artist_name: "Beethoven", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "classical" },
    { name: "Four Seasons", artist_name: "Vivaldi", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "classical" },
    { name: "Canon in D", artist_name: "Pachelbel", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "classical" },
    { name: "Clair de Lune", artist_name: "Debussy", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "classical" },
    { name: "Für Elise", artist_name: "Beethoven", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "classical" },
    { name: "Air on G String", artist_name: "Bach", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "classical" },
    { name: "Nocturne", artist_name: "Chopin", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "classical" },
    
    // Bensound (бесплатные треки)
    { name: "Better Days", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Sunny", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-sunny.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Tenderness", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "pop" },
    { name: "Little Planet", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-littleplanet.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Dubstep", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-dubstep.mp3", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Extreme Action", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-extremeaction.mp3", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "A New Beginning", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "pop" },
    { name: "Going Higher", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-goinghigher.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Creative Minds", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Funky Element", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-funkyelement.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Badass", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-badass.mp3", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Jazzy Frenchy", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop", category: "jazz" },
    { name: "The Jazz Piano", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-thejazzpiano.mp3", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Slow Motion", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Moose", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-moose.mp3", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Tomorrow", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-tomorrow.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Adventure", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-adventure.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Clever", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-clever.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Epic", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-epic.mp3", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "Once Again", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-onceagain.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "November", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-november.mp3", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "pop" },
    { name: "Acoustic Breeze", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Smile", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-smile.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "pop" },
    { name: "Sweet", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-sweet.mp3", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Ukulele", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "pop" },
    { name: "Happiness", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-happiness.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Energy", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-energy.mp3", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop", category: "rock" },
    { name: "Pop Dance", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-popdance.mp3", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop", category: "pop" },
    { name: "Psychedelic", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-psychedelic.mp3", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Science", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-science.mp3", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Sports", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-sports.mp3", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "rock" },
    { name: "Summer", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-summer.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "The Lounge", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-thelounge.mp3", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Waltz", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-waltz.mp3", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop", category: "classical" },
    { name: "Piano Moment", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-pianomoment.mp3", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "classical" },
    { name: "Romantic", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-romantic.mp3", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "classical" },
    { name: "Bossa Nova", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-bossanova.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Luv", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-luv.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "Memories", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-memories.mp3", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Sunny Day", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-sunnyday.mp3", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Silent Motion", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-silentmotion.mp3", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "electronic" },
    { name: "All That", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-allthat.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Dance", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-dance.mp3", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop", category: "pop" },
    { name: "Instinct", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-instinct.mp3", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Spring", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-spring.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Sweet", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-sweet.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "pop" },
    { name: "Hip Jazz", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-hipjazz.mp3", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop", category: "jazz" },
    { name: "Piano", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-piano.mp3", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop", category: "classical" },
    { name: "Escape", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-escape.mp3", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Hip Hop", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-hiphop.mp3", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Retro Soul", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-retrosoul.mp3", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Slow Rock", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-slowrock.mp3", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "rock" },
    { name: "Corporate", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-corporate.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "pop" },
    { name: "Evolution", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-evolution.mp3", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Funny Song", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-funnysong.mp3", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Happy Rock", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "rock" },
    { name: "Jingle Bells", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-jinglebells.mp3", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "classical" },
    { name: "Love", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-love.mp3", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "pop" },
    { name: "Mystery", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-mystery.mp3", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "electronic" },
    { name: "New Dawn", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-newdawn.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "pop" },
    { name: "Ofelia's Dream", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-ofeliasdream.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "classical" },
    { name: "Piano Success", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-pianosuccess.mp3", image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=300&h=300&fit=crop", category: "classical" },
    { name: "Reggae", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-reggae.mp3", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Retro", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-retro.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Slow", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-slow.mp3", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "pop" },
    { name: "Small Town", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-smalltown.mp3", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop", category: "pop" },
    { name: "Soft Rock", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-softrock.mp3", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", category: "rock" },
    { name: "Star Wars", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-starwars.mp3", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Strut", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-strut.mp3", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop", category: "hiphop" },
    { name: "Stylish", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-stylish.mp3", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=300&fit=crop", category: "pop" },
    { name: "Tech House", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-techhouse.mp3", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", category: "electronic" },
    { name: "Tropical", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-tropical.mp3", image: "https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=300&h=300&fit=crop", category: "pop" },
    { name: "Upbeat", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-upbeat.mp3", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop", category: "pop" },
    { name: "Wedding", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-wedding.mp3", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop", category: "classical" },
    { name: "Worry", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-worry.mp3", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", category: "electronic" },
    { name: "You And Me", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-youandme.mp3", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", category: "pop" },
    { name: "Zeal", artist_name: "Bensound", audio: "https://www.bensound.com/bensound-music/bensound-zeal.mp3", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "rock" }
];

// Глобальные переменные
let tracks = [];
let currentTrackIndex = 0;
let youtubePlayer = null;
let isPlaying = false;
let currentCategory = 'all';
let playerReady = false;

// DOM элементы
const trackList = document.getElementById('trackList');
const searchInput = document.getElementById('searchInput');
const playerCover = document.getElementById('playerCover');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const categoryTabs = document.getElementById('categoryTabs');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageInfo = document.getElementById('pageInfo');

// Инициализация YouTube Player
function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'disablekb': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    playerReady = true;
    console.log('YouTube Player ready');
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        playBtn.textContent = '⏸';
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        playBtn.textContent = '▶';
    } else if (event.data === YT.PlayerState.ENDED) {
        playNext();
    }
}

// Инициализация Telegram Web App
function initTelegram() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Адаптация цветов под тему Telegram
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#121212');
        document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#b3b3b3');
        document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#1db954');
        document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#1db954');
        document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color || '#181818');
        
        // Расширение на весь экран
        tg.expand();
        
        console.log('Telegram Web App initialized');
    }
}

// Загрузка треков - используем предопределенные треки знаменитостей + пагинация
let currentPage = 1;
const tracksPerPage = 20;

// Поиск треков через YouTube Data API v3
async function searchYouTube(query, maxResults = 20) {
    if (YOUTUBE_API_KEY === 'YOUR_API_KEY_HERE') {
        console.log('YouTube API ключ не установлен, используем предопределенные треки');
        return null;
    }

    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query + ' music')}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error('YouTube API ошибка:', data.error);
            return null;
        }

        // Преобразуем результаты в формат треков
        const tracks = data.items.map(item => ({
            name: item.snippet.title,
            artist_name: item.snippet.channelTitle,
            videoId: item.id.videoId,
            image: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
            category: 'pop' // Категория определяется позже
        }));

        return tracks;
    } catch (error) {
        console.error('Ошибка поиска YouTube:', error);
        return null;
    }
}

async function loadTracks(searchQuery = '', page = 1) {
    trackList.innerHTML = '<div class="loading">Загрузка треков...</div>';
    
    // Небольшая задержка для UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (searchQuery) {
        // Пытаемся найти через YouTube API
        const youtubeResults = await searchYouTube(searchQuery, 50);
        
        if (youtubeResults && youtubeResults.length > 0) {
            // Пагинация для результатов YouTube
            const start = (page - 1) * tracksPerPage;
            const end = start + tracksPerPage;
            tracks = youtubeResults.slice(start, end);
            currentPage = page;
        } else {
            // Fallback - фильтрация по предопределенным трекам
            const query = searchQuery.toLowerCase();
            const filtered = CELEBRITY_TRACKS.filter(track => 
                track.name.toLowerCase().includes(query) || 
                track.artist_name.toLowerCase().includes(query)
            );
            
            const start = (page - 1) * tracksPerPage;
            const end = start + tracksPerPage;
            tracks = filtered.slice(start, end);
            currentPage = page;
        }
    } else {
        // Пагинация для всех предопределенных треков
        const start = (page - 1) * tracksPerPage;
        const end = start + tracksPerPage;
        tracks = CELEBRITY_TRACKS.slice(start, end);
        currentPage = page;
    }
    
    renderTrackList();
}

// Загрузить следующую страницу
function loadNextPage() {
    const maxPage = Math.ceil(CELEBRITY_TRACKS.length / tracksPerPage);
    if (currentPage < maxPage) {
        loadTracks(searchInput.value, currentPage + 1);
    }
}

// Загрузить предыдущую страницу
function loadPrevPage() {
    if (currentPage > 1) {
        loadTracks(searchInput.value, currentPage - 1);
    }
}

// Определение категории на основе названия трека и артиста
function getCategoryFromGenre(artist, title) {
    const text = (artist + ' ' + title).toLowerCase();
    if (text.includes('pop') || text.includes('taylor swift') || text.includes('ariana') || text.includes('justin') || text.includes('bieber') || text.includes('ed sheeran')) return 'pop';
    if (text.includes('rock') || text.includes('queen') || text.includes('beatles') || text.includes('ac/dc') || text.includes('linkin') || text.includes('coldplay')) return 'rock';
    if (text.includes('electronic') || text.includes('edm') || text.includes('daft punk') || text.includes('calvin') || text.includes('marshmello') || text.includes('martin')) return 'electronic';
    if (text.includes('hip') || text.includes('rap') || text.includes('drake') || text.includes('kendrick') || text.includes('eminem') || text.includes('travis') || text.includes('post')) return 'hiphop';
    if (text.includes('jazz') || text.includes('miles') || text.includes('coltrane')) return 'jazz';
    if (text.includes('classical') || text.includes('mozart') || text.includes('beethoven')) return 'classical';
    return 'pop'; // По умолчанию
}

// Отрисовка списка треков
function renderTrackList() {
    trackList.innerHTML = '';
    
    // Фильтрация по категории
    const filteredTracks = currentCategory === 'all' 
        ? tracks 
        : tracks.filter(track => track.category === currentCategory);
    
    if (filteredTracks.length === 0) {
        trackList.innerHTML = '<div class="loading">Нет треков в этой категории</div>';
        return;
    }
    
    filteredTracks.forEach((track, displayIndex) => {
        // Находим реальный индекс в массиве tracks
        const realIndex = tracks.indexOf(track);
        
        const trackItem = document.createElement('div');
        trackItem.className = 'track-item';
        trackItem.dataset.index = realIndex;
        
        const coverUrl = track.image || 'https://via.placeholder.com/56?text=♪';
        
        trackItem.innerHTML = `
            <div class="track-number">${displayIndex + 1}</div>
            <img src="${coverUrl}" alt="${track.name}" class="track-cover">
            <div class="track-info">
                <div class="track-name">${track.name}</div>
                <div class="track-artist">${track.artist_name}</div>
            </div>
            <button class="track-play-btn">▶</button>
        `;
        
        trackItem.addEventListener('click', () => playTrack(realIndex));
        trackList.appendChild(trackItem);
    });
    
    // Обновляем пагинацию
    updatePagination();
}

// Обновление пагинации
function updatePagination() {
    const maxPage = Math.ceil(CELEBRITY_TRACKS.length / tracksPerPage);
    pageInfo.textContent = `Страница ${currentPage} из ${maxPage}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage >= maxPage;
}

// Воспроизведение трека
function playTrack(index) {
    if (index < 0 || index >= tracks.length) {
        console.error('Invalid track index:', index);
        return;
    }
    
    currentTrackIndex = index;
    const track = tracks[index];
    
    // Обновление UI плеера
    playerCover.src = track.image || 'https://via.placeholder.com/60?text=♪';
    playerTitle.textContent = track.name;
    playerArtist.textContent = track.artist_name;
    
    // Если есть videoId (YouTube), используем YouTube плеер
    if (track.videoId && playerReady) {
        youtubePlayer.loadVideoById(track.videoId);
        isPlaying = true;
        playBtn.textContent = '⏸';
    } else if (track.audio) {
        // Иначе используем Audio (для fallback треков)
        if (!window.audio) {
            window.audio = new Audio();
        }
        window.audio.src = track.audio;
        window.audio.play().catch(err => {
            console.error('Audio play error:', err);
            isPlaying = false;
            playBtn.textContent = '▶';
        });
        isPlaying = true;
        playBtn.textContent = '⏸';
    } else {
        console.error('Track has no videoId or audio:', track);
    }
    
    // Обновление активного трека в списке
    updateActiveTrack();
}

// Обновление активного трека в списке
function updateActiveTrack() {
    document.querySelectorAll('.track-item').forEach((item) => {
        const itemIndex = parseInt(item.dataset.index);
        if (itemIndex === currentTrackIndex) {
            item.classList.add('active');
            const playBtn = item.querySelector('.track-play-btn');
            if (playBtn) playBtn.textContent = '⏸';
        } else {
            item.classList.remove('active');
            const playBtn = item.querySelector('.track-play-btn');
            if (playBtn) playBtn.textContent = '▶';
        }
    });
}

// Форматирование времени
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Обновление прогресс-бара
function updateProgress() {
    if (playerReady && youtubePlayer && youtubePlayer.getCurrentTime) {
        const currentTime = youtubePlayer.getCurrentTime();
        const duration = youtubePlayer.getDuration();
        const progress = (currentTime / duration) * 100;
        progressBar.value = progress || 0;
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    } else if (window.audio) {
        const progress = (window.audio.currentTime / window.audio.duration) * 100;
        progressBar.value = progress || 0;
        currentTimeEl.textContent = formatTime(window.audio.currentTime);
        durationEl.textContent = formatTime(window.audio.duration);
    }
}

// Управление воспроизведением
function togglePlay() {
    if (tracks.length === 0) {
        // Если нет треков, загружаем их
        loadTracks();
        return;
    }
    
    if (isPlaying) {
        if (playerReady && youtubePlayer && youtubePlayer.pauseVideo) {
            youtubePlayer.pauseVideo();
            isPlaying = false;
            playBtn.textContent = '▶';
        } else if (window.audio) {
            window.audio.pause();
            isPlaying = false;
            playBtn.textContent = '▶';
        }
    } else {
        // Если трек не выбран, выбираем первый
        if (currentTrackIndex === -1 || currentTrackIndex >= tracks.length) {
            currentTrackIndex = 0;
        }
        
        if (playerReady && youtubePlayer && youtubePlayer.playVideo) {
            youtubePlayer.playVideo();
            isPlaying = true;
            playBtn.textContent = '⏸';
        } else if (window.audio) {
            window.audio.play();
            isPlaying = true;
            playBtn.textContent = '⏸';
        }
    }
    updateActiveTrack();
}

function playNext() {
    if (tracks.length === 0) return;
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
}

function playPrev() {
    if (tracks.length === 0) return;
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}

// Перемотка
function seek(e) {
    if (playerReady && youtubePlayer && youtubePlayer.getDuration) {
        const duration = youtubePlayer.getDuration();
        const seekTime = (progressBar.value / 100) * duration;
        youtubePlayer.seekTo(seekTime, true);
    } else if (window.audio && isFinite(window.audio.duration)) {
        const seekTime = (progressBar.value / 100) * window.audio.duration;
        if (isFinite(seekTime)) {
            window.audio.currentTime = seekTime;
        }
    }
}

// Обработка переключения категорий
function handleCategoryChange(e) {
    if (e.target.classList.contains('category-tab')) {
        // Убираем активный класс со всех табов
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Добавляем активный класс на нажатый таб
        e.target.classList.add('active');
        
        // Обновляем текущую категорию
        currentCategory = e.target.dataset.category;
        
        // Перерисовываем список треков
        renderTrackList();
    }
}

// Поиск с debounce
let searchTimeout;
function handleSearch(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = e.target.value.trim();
        if (query) {
            // При поиске сбрасываем категорию на "all"
            currentCategory = 'all';
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector('[data-category="all"]').classList.add('active');
            loadTracks(query);
        } else {
            // Если поиск пустой, загружаем все треки
            loadTracks();
        }
    }, 500);
}

// Интервал для обновления прогресса YouTube
let progressInterval = null;

function startProgressUpdate() {
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(updateProgress, 1000);
}

function stopProgressUpdate() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

// События UI
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
progressBar.addEventListener('input', seek);
searchInput.addEventListener('input', handleSearch);
categoryTabs.addEventListener('click', handleCategoryChange);
prevPageBtn.addEventListener('click', loadPrevPage);
nextPageBtn.addEventListener('click', loadNextPage);

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initTelegram();
    initNavigation();
    loadTracks();
    startProgressUpdate();
});

// Навигация по вкладкам
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('pageTitle');
    const searchContainer = document.getElementById('searchContainer');

    const tabTitles = {
        home: 'Главная',
        myMusic: 'Моя музыка',
        search: 'Поиск',
        profile: 'Профиль'
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;

            // Обновляем активную кнопку навигации
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Обновляем активный контент
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tab}Tab`).classList.add('active');

            // Обновляем заголовок
            pageTitle.textContent = tabTitles[tab];

            // Показываем/скрываем поиск в хедере
            if (tab === 'home') {
                searchContainer.style.display = 'block';
            } else {
                searchContainer.style.display = 'none';
            }
        });
    });

    // Обработка кликов по предложениям поиска
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
        item.addEventListener('click', () => {
            const query = item.textContent;
            // Переключаем на главную и выполняем поиск
            document.querySelector('[data-tab="home"]').click();
            searchInput.value = query;
            handleSearch({ target: { value: query } });
        });
    });

    // Обработка большого поля поиска
    const searchInputLarge = document.getElementById('searchInputLarge');
    if (searchInputLarge) {
        searchInputLarge.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query) {
                // Переключаем на главную и выполняем поиск
                document.querySelector('[data-tab="home"]').click();
                searchInput.value = query;
                handleSearch({ target: { value: query } });
            }
        });
    }

    // Обработка кнопки My Wave
    const wavePlayBtn = document.getElementById('wavePlayBtn');
    if (wavePlayBtn) {
        wavePlayBtn.addEventListener('click', () => {
            if (tracks.length > 0) {
                playTrack(0);
            } else {
                loadTracks();
            }
        });
    }

    // Обработка плиток категорий в поиске
    const categoryTiles = document.querySelectorAll('.category-tile');
    categoryTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const category = tile.classList[1]; // Второй класс - это категория
            const categoryMap = {
                'pop': 'pop',
                'rap': 'hiphop',
                'rock': 'rock',
                'electronic': 'electronic',
                'jazz': 'jazz',
                'classical': 'classical'
            };
            
            // Переключаем на главную и выбираем категорию
            document.querySelector('[data-tab="home"]').click();
            const targetCategory = categoryMap[category] || 'all';
            
            // Обновляем активную категорию
            document.querySelectorAll('.category-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.category === targetCategory) {
                    tab.classList.add('active');
                }
            });
            
            currentCategory = targetCategory;
            loadTracks();
        });
    });

    // Обработка фильтров в коллекции
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Здесь можно добавить логику фильтрации контента
        });
    });

    // Обработка кнопок хедера
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            document.querySelector('[data-tab="profile"]').click();
        });
    }

    const deviceBtn = document.getElementById('deviceBtn');
    if (deviceBtn) {
        deviceBtn.addEventListener('click', () => {
            alert('Управление устройствами');
        });
    }

    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            alert('Уведомления');
        });
    }
}
