#include<iostream>
#include<vector>
using namespace std;

void selectionSort(vector<int>& arr) { // Pass by reference

    int n = arr.size();

    for(int i = 0; i < n - 1; i++) {

        int minIdx = i;

        // find minimum element
        for(int j = i + 1; j < n; j++) {
            if(arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        // place minimum at correct position
        swap(arr[i], arr[minIdx]);
    }
}

int main() {

    int n;
    cout << "Enter number of elements: ";
    cin >> n;

    vector<int> arr(n);
    cout << "Enter elements:\n";
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    selectionSort(arr);

    cout << "Sorted Array:\n";

    for(int x : arr) {
        cout << x << " ";
    }

    cout << endl;

    return 0;
}