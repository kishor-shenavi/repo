// =============================================
//  IT Help Desk Expert System - Knowledge Base
//  Each rule = one IT problem
//  keys  → keywords to detect the problem
//  reply → diagnosis + step-by-step solution
// =============================================

const rules = [

  {
    keys: ['hello', 'hi', 'hey', 'help', 'start', 'hii'],
    reply: "👋 Hello! Welcome to the IT Help Desk Expert System!\n\nI can diagnose and solve:\n• 📶 WiFi / Internet issues\n• 🖨️ Printer problems\n• 🐢 Slow / Hanging PC\n• ⌨️ Keyboard issues\n• 🖥️ Screen / Display problems\n• 💿 Software crashes\n• 🦠 Virus / Malware\n• 🔑 Password / Login issues\n• 💙 Blue Screen (BSOD)\n• 💾 Storage / Disk Full\n\nDescribe your problem and I'll diagnose it!"
  },

  {
    keys: ['wifi', 'internet', 'network', 'no connection', 'not connecting', 'connection'],
    reply: "📶 WiFi / Internet Problem Diagnosed!\n\n🔍 Possible Causes:\n• Router may be off or restarting\n• WiFi driver issue\n• IP address conflict\n\n✅ Solutions (try in order):\n1. Turn WiFi OFF and ON again\n2. Restart your router (unplug 30 sec)\n3. Forget the network and reconnect\n4. Run: Settings → Troubleshoot → Internet\n5. Update network driver\n6. Restart your computer\n\n❓ Still not fixed? Call IT: Ext. 101"
  },

  {
    keys: ['printer', 'print', 'printing', 'paper'],
    reply: "🖨️ Printer Problem Diagnosed!\n\n🔍 Possible Causes:\n• Printer offline or out of paper\n• Print queue stuck\n• Driver not installed\n\n✅ Solutions (try in order):\n1. Check printer is ON and paper is loaded\n2. Set printer as Default Printer\n3. Clear print queue:\n   → Control Panel → Devices → Printer → Cancel all\n4. Restart Print Spooler service\n5. Reinstall printer driver\n\n❓ Still not fixed? Call IT: Ext. 101"
  },

  {
    keys: ['slow', 'hang', 'hanging', 'freeze', 'freezing', 'lagging', 'lag', 'not responding'],
    reply: "🐢 Slow / Hanging PC Diagnosed!\n\n🔍 Possible Causes:\n• Too many programs running\n• Low RAM or disk space\n• Virus / malware\n• Overheating\n\n✅ Solutions:\n1. Press Ctrl+Shift+Esc → Close heavy apps\n2. Disk Cleanup → Delete temp files\n3. Keep at least 10GB free on C: drive\n4. Run antivirus scan\n5. Restart the computer\n6. Check if fan/vents are blocked\n\n❓ Still slow? Call IT: Ext. 101"
  },

  {
    keys: ['keyboard', 'keys', 'typing', 'type'],
    reply: "⌨️ Keyboard Problem Diagnosed!\n\n🔍 Possible Causes:\n• Loose connection\n• Driver issue\n• Filter Keys / Num Lock ON\n\n✅ Solutions:\n1. Unplug and replug keyboard (USB)\n2. Try a different USB port\n3. Settings → Ease of Access → Keyboard → Turn off Filter Keys\n4. Update/reinstall keyboard driver\n5. Test with on-screen keyboard:\n   → Search 'On-Screen Keyboard'\n\n❓ Still not working? Call IT: Ext. 101"
  },

  {
    keys: ['screen', 'monitor', 'display', 'blank', 'black screen', 'no display', 'flickering'],
    reply: "🖥️ Screen / Display Problem Diagnosed!\n\n🔍 Possible Causes:\n• Cable loose or damaged\n• Display driver crashed\n• Brightness set to 0\n\n✅ Solutions:\n1. Check monitor power and cable\n2. Press Windows + P → Select display mode\n3. Increase brightness (Fn + brightness key)\n4. Right-click desktop → Display Settings\n5. Update/rollback display driver\n\n❓ Still not fixed? Call IT: Ext. 101"
  },

  {
    keys: ['software', 'app', 'application', 'program', 'install', 'not opening', 'crash', 'crashing'],
    reply: "💿 Software / App Problem Diagnosed!\n\n🔍 Possible Causes:\n• App files corrupted\n• Missing dependencies\n• Insufficient permissions\n\n✅ Solutions:\n1. Close and reopen the application\n2. Right-click → Run as Administrator\n3. Repair: Settings → Apps → Select app → Modify → Repair\n4. Uninstall and reinstall\n5. Check Windows is up to date\n\n❓ Still crashing? Call IT: Ext. 101"
  },

  {
    keys: ['virus', 'malware', 'hacked', 'suspicious', 'ransomware'],
    reply: "🦠 Virus / Security Threat Diagnosed!\n\n⚠️ This is URGENT — act immediately!\n\n✅ Steps:\n1. DISCONNECT from internet immediately\n2. Do NOT open any suspicious files/emails\n3. Run full antivirus scan (Windows Defender)\n4. Delete all detected threats\n5. Change all passwords from a DIFFERENT device\n6. Report to IT Security immediately\n\n🚨 Call IT Security NOW: Ext. 999"
  },

  {
    keys: ['password', 'forgot password', 'reset password', 'locked', 'cant login', 'login'],
    reply: "🔑 Password / Login Problem Diagnosed!\n\n✅ Solutions:\n1. Click 'Forgot Password' on login screen\n2. Use registered email/phone for OTP reset\n3. Windows login locked:\n   → Ask admin: Computer Mgmt → Local Users → Reset\n4. If account locked: wait 30 mins (auto-unlock)\n\n📞 IT Help: Ext. 101\n⏰ Mon–Fri, 9AM–6PM"
  },

  {
    keys: ['blue screen', 'bsod', 'crash', 'restart automatically'],
    reply: "💙 Blue Screen (BSOD) Diagnosed!\n\n🔍 Possible Causes:\n• Driver conflict\n• RAM issue\n• Corrupted system files\n\n✅ Solutions:\n1. Note the error code on blue screen\n2. Restart → press F8 → Safe Mode\n3. Run in Command Prompt: sfc /scannow\n4. Update all drivers\n5. Run Memory Diagnostic:\n   → Search 'Windows Memory Diagnostic'\n\n❓ Recurring? Call IT: Ext. 101"
  },

  {
    keys: ['storage', 'disk full', 'no space', 'memory full'],
    reply: "💾 Storage / Disk Full Diagnosed!\n\n✅ Solutions:\n1. Run Disk Cleanup → Search 'Disk Cleanup' → Select C:\n2. Empty Recycle Bin and Downloads\n3. Uninstall unused apps:\n   → Settings → Apps → Sort by size\n4. Move files to external drive or cloud\n5. Settings → System → Storage → See what's using space\n\n💡 Always keep 10GB+ free on C: drive"
  },

  {
    keys: ['thank', 'thanks', 'solved', 'fixed', 'working', 'great'],
    reply: "✅ Glad your issue is resolved!\n\nFeel free to come back anytime. Have a productive day! 💻"
  },

  {
    keys: ['bye', 'exit', 'done', 'goodbye'],
    reply: "👋 Thank you for using the IT Help Desk!\nStay productive! 💻"
  }

];