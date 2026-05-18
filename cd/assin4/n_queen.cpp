#include <iostream>
#include <vector>

using namespace std;

class NQueens {
private:
    int n;

    // Stores column position of queen for each row
    vector<int> board;

    // Branch and Bound arrays
    vector<bool> columns;
    vector<bool> leftDiagonal;
    vector<bool> rightDiagonal;

    int solutionCount;

public:

    NQueens(int size) {
        n = size;

        board.resize(n);

        columns.resize(n, false);

        // Total diagonals = 2*n - 1
        leftDiagonal.resize(2 * n - 1, false);
        rightDiagonal.resize(2 * n - 1, false);

        solutionCount = 0;
    }

    // Function to print board
    void printBoard() {

        cout << "Solution " << solutionCount << ":\n";

        for (int i = 0; i < n; i++) {

            for (int j = 0; j < n; j++) {

                if (board[i] == j)
                    cout << "Q ";
                else
                    cout << ". ";
            }

            cout << endl;
        }

        cout << endl;
    }

    // Backtracking function
    void solve(int row) {

        // Base condition
        if (row == n) {
            solutionCount++;
            printBoard();
            return;
        }

        // Try placing queen in every column
        for (int col = 0; col < n; col++) {

            /*
                Branch and Bound Checking

                columns[col]                 -> same column
                leftDiagonal[row-col+n-1]   -> main diagonal
                rightDiagonal[row+col]      -> secondary diagonal
            */

            if (columns[col] == false &&
                leftDiagonal[row - col + n - 1] == false &&
                rightDiagonal[row + col] == false) {

                // Place queen
                board[row] = col;

                columns[col] = true;
                leftDiagonal[row - col + n - 1] = true;
                rightDiagonal[row + col] = true;

                // Recursive call
                solve(row + 1);

                // Backtracking
                columns[col] = false;
                leftDiagonal[row - col + n - 1] = false;
                rightDiagonal[row + col] = false;
            }
        }
    }

    void start() {

        solve(0);

        if (solutionCount == 0)
            cout << "No solutions exist.\n";
        else
            cout << "Total Solutions = " << solutionCount << endl;
    }
};

int main() {

    int n;

    cout << "Enter value of N: ";
    cin >> n;

    NQueens obj(n);

    obj.start();

    return 0;
}



























// #include <iostream>
// #include <vector>
// using namespace std;

// class Solution {
// public:
//     bool isSafe(vector<string>& board, int row, int col, int n) {
//         for (int i = 0; i < row; i++)
//             if (board[i][col] == 'Q')
//                 return false;

//         for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
//             if (board[i][j] == 'Q')
//                 return false;

//         for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++)
//             if (board[i][j] == 'Q')
//                 return false;

//         return true;
//     }

//     void solve(int row, vector<string>& board, vector<vector<string>>& result, int n) {
//         if (row == n) {
//             result.push_back(board);
//             return;
//         }

//         for (int col = 0; col < n; col++) {
//             if (isSafe(board, row, col, n)) {
//                 board[row][col] = 'Q';
//                 solve(row + 1, board, result, n);
//                 board[row][col] = '.';
//             }
//         }
//     }

//     vector<vector<string>> solveNQueens(int n) {
//         vector<vector<string>> result;
//         vector<string> board(n, string(n, '.'));
//         solve(0, board, result, n);
//         return result;
//     }
// };

// int main() {
//     int n = 4;
//     Solution sol;
//     vector<vector<string>> solutions = sol.solveNQueens(n);

//     cout << "Total Solutions: " << solutions.size() << endl;

//     for (auto& sol : solutions) {
//         cout << "---------" << endl;
//         for (auto& row : sol) {
//             cout << row << endl;
//         }
//     }

//     return 0;
// }
















