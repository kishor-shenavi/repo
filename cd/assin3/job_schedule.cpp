#include <iostream>
#include <algorithm>

using namespace std;

struct Job {

    char id;
    int deadline;
    int profit;
};

bool compare(Job a, Job b) {

    return a.profit > b.profit;
}

void jobScheduling(Job jobs[], int n) {

    sort(jobs, jobs + n, compare);

    int result[n];
    bool slot[n];

    for (int i = 0; i < n; i++) {
        slot[i] = false;
    }

    for (int i = 0; i < n; i++) {

        for (int j = min(n, jobs[i].deadline) - 1; j >= 0; j--) {

            if (slot[j] == false) {

                result[j] = i;
                slot[j] = true;
                break;
            }
        }
    }

    cout << "Selected Jobs:\n";

    for (int i = 0; i < n; i++) {

        if (slot[i]) {
            cout << jobs[result[i]].id << " ";
        }
    }
}

int main() {

    Job jobs[] = {
        {'A', 2, 100},
        {'B', 1, 19},
        {'C', 2, 27},
        {'D', 1, 25},
        {'E', 3, 15}
    };

    int n = sizeof(jobs) / sizeof(jobs[0]);

    jobScheduling(jobs, n);

    return 0;
}