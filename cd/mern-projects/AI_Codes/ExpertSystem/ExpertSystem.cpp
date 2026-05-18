#include <iostream>
#include <string>

using namespace std;

int main() {

    string problem;

    cout << "===== IT HELP DESK EXPERT SYSTEM =====\n";

    while (true) {

        cout << "\nEnter your problem (type exit to quit): ";
        getline(cin, problem);

        // EXIT
        if (problem == "exit") {

            cout << "Thank you!\n";
            break;
        }

        // WIFI
        else if (problem.find("wifi") != string::npos ||
                 problem.find("internet") != string::npos) {

            cout << "\nWiFi Problem Diagnosed!\n";
            cout << "1. Restart router\n";
            cout << "2. Reconnect WiFi\n";
            cout << "3. Restart PC\n";
        }

        // PRINTER
        else if (problem.find("printer") != string::npos ||
                 problem.find("print") != string::npos) {

            cout << "\nPrinter Problem Diagnosed!\n";
            cout << "1. Check paper\n";
            cout << "2. Restart printer\n";
            cout << "3. Check cable\n";
        }

        // SLOW PC
        else if (problem.find("slow") != string::npos ||
                 problem.find("hang") != string::npos) {

            cout << "\nSlow PC Diagnosed!\n";
            cout << "1. Close extra programs\n";
            cout << "2. Restart computer\n";
            cout << "3. Run antivirus\n";
        }

        // KEYBOARD
        else if (problem.find("keyboard") != string::npos) {

            cout << "\nKeyboard Problem Diagnosed!\n";
            cout << "1. Reconnect keyboard\n";
            cout << "2. Try another USB port\n";
        }

        // SCREEN
        else if (problem.find("screen") != string::npos ||
                 problem.find("display") != string::npos) {

            cout << "\nScreen Problem Diagnosed!\n";
            cout << "1. Check display cable\n";
            cout << "2. Restart monitor\n";
        }

        // VIRUS
        else if (problem.find("virus") != string::npos) {

            cout << "\nVirus Detected!\n";
            cout << "1. Disconnect internet\n";
            cout << "2. Run antivirus\n";
        }

        // PASSWORD
        else if (problem.find("password") != string::npos ||
                 problem.find("login") != string::npos) {

            cout << "\nPassword Problem Diagnosed!\n";
            cout << "1. Click Forgot Password\n";
            cout << "2. Reset using OTP\n";
        }

        // DEFAULT
        else {

            cout << "\nProblem not identified.\n";
            cout << "Try again.\n";
        }
    }

    return 0;
}