#include <iostream>
#include <string>
#include <cctype>

using namespace std;   

// ================= CLASS DEFINITION =================
class EmployeeExpertSystem
{
public:
    float attendance, productivity, teamwork;
    float punctuality, communication, innovation;

    float totalScore;

    string performance;
    string recommendation;
    string risk;

    // ================= INPUT FUNCTION =================
    void getInput()
    {
        cout << "\n========== EMPLOYEE PERFORMANCE EXPERT SYSTEM ==========\n";

        cout << "Attendance Percentage (0-100): ";
        cin >> attendance;

        cout << "Productivity Score (0-10): ";
        cin >> productivity;

        cout << "Teamwork Score (0-10): ";
        cin >> teamwork;

        cout << "Punctuality Score (0-10): ";
        cin >> punctuality;

        cout << "Communication Skill Score (0-10): ";
        cin >> communication;

        cout << "Innovation Score (0-10): ";
        cin >> innovation;
    }

    // ================= SCORE CALCULATION =================
    void calculateScore()
    {
        totalScore =
            (attendance / 10.0) +
            productivity +
            teamwork +
            punctuality +
            communication +
            innovation;
    }

    // ================= PERFORMANCE ANALYSIS =================
    void analyzePerformance()
    {
        if (totalScore >= 50)
        {
            performance = "EXCELLENT";
            recommendation =
                "Eligible for promotion, leadership role, and bonus";
            risk = "LOW";
        }

        else if (totalScore >= 40)
        {
            performance = "GOOD";
            recommendation =
                "Consistent employee with growth potential";
            risk = "LOW";
        }

        else if (totalScore >= 30)
        {
            performance = "AVERAGE";
            recommendation =
                "Needs training and performance monitoring";
            risk = "MEDIUM";
        }

        else
        {
            performance = "POOR";
            recommendation =
                "Immediate improvement plan required";
            risk = "HIGH";
        }
    }

    // ================= EXPERT RULES =================
    void expertRules()
    {
        if (attendance < 60)
        {
            cout << "\n[ALERT] Low attendance detected.";
        }

        if (productivity < 5)
        {
            cout << "\n[ALERT] Productivity improvement required.";
        }

        if (teamwork < 5)
        {
            cout << "\n[ALERT] Employee struggles in team collaboration.";
        }

        if (communication < 5)
        {
            cout << "\n[ALERT] Communication training recommended.";
        }

        if (innovation >= 9)
        {
            cout << "\n[SPECIAL NOTE] Highly innovative employee.";
        }
    }

    // ================= DISPLAY REPORT =================
    void displayReport()
    {
        cout << "\n\n========== PERFORMANCE REPORT ==========\n";

        cout << "Attendance     : " << attendance << "%" << endl;
        cout << "Productivity   : " << productivity << "/10" << endl;
        cout << "Teamwork       : " << teamwork << "/10" << endl;
        cout << "Punctuality    : " << punctuality << "/10" << endl;
        cout << "Communication  : " << communication << "/10" << endl;
        cout << "Innovation     : " << innovation << "/10" << endl;

        cout << "\nTotal Score    : " << totalScore << "/60" << endl;

        cout << "Performance    : " << performance << endl;
        cout << "Risk Level     : " << risk << endl;

        cout << "Recommendation : " << recommendation << endl;
    }
};

// ================= MAIN FUNCTION =================
int main()
{
    while (true)
    {
        EmployeeExpertSystem emp;

        emp.getInput();

        emp.calculateScore();

        emp.analyzePerformance();

        emp.expertRules();

        emp.displayReport();

        // CONTINUE OPTION
        char again;

        cout << "\nEvaluate another employee? (y/n): ";
        cin >> again;

        again = tolower(again);

        if (again != 'y')
        {
            cout << "\nExpert System Closed.\n";
            break;
        }
    }

    return 0;
}






















// #include <iostream>
// #include <string>

// using namespace std;

// // ================= RULE STRUCTURE =================
// struct Rule
// {
//     float minScore;
//     float maxScore;
//     string performance;
//     string recommendation;
//     string risk;
// };

// // ================= EXPERT SYSTEM CLASS =================
// class EmployeeExpertSystem
// {
// private:

//     // Employee Parameters
//     float attendance;
//     float productivity;
//     float teamwork;
//     float punctuality;
//     float communication;
//     float innovation;

//     // Weighted Final Score
//     float finalScore = 0;

//     // Output Results
//     string performance;
//     string recommendation;
//     string risk;

//     // Knowledge Base
//     Rule rules[4] =
//     {
//         {85, 100, "EXCELLENT",
//         "Eligible for Promotion and Bonus", "LOW"},

//         {70, 84, "GOOD",
//         "Consistent Employee with Growth Potential", "LOW"},

//         {50, 69, "AVERAGE",
//         "Training and Monitoring Required", "MEDIUM"},

//         {0, 49, "POOR",
//         "Immediate Improvement Plan Required", "HIGH"}
//     };

// public:

//     // ================= INPUT FUNCTION =================
//     void getInput()
//     {
//         cout << "\n========== EMPLOYEE PERFORMANCE EXPERT SYSTEM ==========\n";

//         cout << "Attendance Percentage (0-100): ";
//         cin >> attendance;

//         cout << "Productivity Score (0-10): ";
//         cin >> productivity;

//         cout << "Teamwork Score (0-10): ";
//         cin >> teamwork;

//         cout << "Punctuality Score (0-10): ";
//         cin >> punctuality;

//         cout << "Communication Score (0-10): ";
//         cin >> communication;

//         cout << "Innovation Score (0-10): ";
//         cin >> innovation;
//     }

//     // ================= INFERENCE ENGINE =================
//     void calculateScore()
//     {
//         // Parameters stored in array
//         float parameters[6] =
//         {
//             attendance / 10,
//             productivity,
//             teamwork,
//             punctuality,
//             communication,
//             innovation
//         };

//         // Weight of each parameter
//         float weights[6] =
//         {
//             0.20,
//             0.20,
//             0.15,
//             0.15,
//             0.15,
//             0.15
//         };

//         // Weighted Score Calculation
//         for (int i = 0; i < 6; i++)
//         {
//             finalScore += parameters[i] * weights[i] * 10;
//         }
//     }

//     // ================= RULE BASE PROCESSING =================
//     void applyRules()
//     {
//         for (int i = 0; i < 4; i++)
//         {
//             if (finalScore >= rules[i].minScore &&
//                 finalScore <= rules[i].maxScore)
//             {
//                 performance = rules[i].performance;
//                 recommendation = rules[i].recommendation;
//                 risk = rules[i].risk;

//                 break;
//             }
//         }
//     }

//     // ================= SPECIAL EXPERT RULES =================
//     void specialRules()
//     {
//         cout << "\n========== EXPERT ANALYSIS ==========\n";

//         if (attendance < 60)
//         {
//             cout << "[ALERT] Low Attendance Detected\n";
//         }

//         if (productivity < 5)
//         {
//             cout << "[ALERT] Productivity Improvement Required\n";
//         }

//         if (teamwork < 5)
//         {
//             cout << "[ALERT] Weak Team Collaboration Skills\n";
//         }

//         if (communication < 5)
//         {
//             cout << "[ALERT] Communication Training Recommended\n";
//         }

//         if (innovation >= 9)
//         {
//             cout << "[SPECIAL NOTE] Highly Innovative Employee\n";
//         }
//     }

//     // ================= DISPLAY FUNCTION =================
//     void displayReport()
//     {
//         cout << "\n========== FINAL PERFORMANCE REPORT ==========\n";

//         cout << "Attendance      : " << attendance << "%" << endl;
//         cout << "Productivity    : " << productivity << "/10" << endl;
//         cout << "Teamwork        : " << teamwork << "/10" << endl;
//         cout << "Punctuality     : " << punctuality << "/10" << endl;
//         cout << "Communication   : " << communication << "/10" << endl;
//         cout << "Innovation      : " << innovation << "/10" << endl;

//         cout << "\nFinal Score     : " << finalScore << "/100" << endl;

//         cout << "Performance     : " << performance << endl;
//         cout << "Risk Level      : " << risk << endl;

//         cout << "Recommendation  : "
//              << recommendation << endl;
//     }
// };

// // ================= MAIN FUNCTION =================
// int main()
// {
//     char choice;

//     do
//     {
//         EmployeeExpertSystem emp;

//         emp.getInput();

//         emp.calculateScore();

//         emp.applyRules();

//         emp.specialRules();

//         emp.displayReport();

//         cout << "\nEvaluate Another Employee? (y/n): ";
//         cin >> choice;

//     } while (choice == 'y' || choice == 'Y');

//     cout << "\nExpert System Closed Successfully.\n";

//     return 0;
// }