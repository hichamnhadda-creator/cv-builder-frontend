import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log("URL:", supabaseUrl);
// Don't log full key
console.log("KEY prefix:", supabaseKey ? supabaseKey.substring(0, 20) : "MISSING");

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
    console.log("Attempting to login...");
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'password123'
    });
    
    if (error) {
        console.error("Login failed with error:", error.message, error.name, error.status);
    } else {
        console.log("Login succeeded?", !!data.user);
    }
}

testLogin();
