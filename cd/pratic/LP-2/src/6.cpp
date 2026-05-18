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