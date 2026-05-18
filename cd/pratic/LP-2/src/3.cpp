#include <iostream>
#include <vector>

using namespace std;

class NQueens
{
    int n;

    vector<vector<int>> board;

    // Branch and Bound helper arrays
    vector<bool> col;
    vector<bool> d1;
    vector<bool> d2;

public:
    NQueens(int size)
    {
        n = size;

        board.resize(n, vector<int>(n, 0));

        col.resize(n, false);

        d1.resize(2 * n - 1, false);

        d2.resize(2 * n - 1, false);
    }

    // Print Solution
    void printBoard()
    {
        cout << "\nSolution:\n\n";

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (board[i][j] == 1)
                    cout << "Q ";
                else
                    cout << ". ";
            }

            cout << endl;
        }
    }

    // Backtracking Function
    bool solve(int row)
    {
        // Base Case
        if (row == n) return true;

        for (int c = 0; c < n; c++)
        {
            // Branch and Bound safety check
            if (!col[c] &&
                !d1[row - c + n - 1] &&
                !d2[row + c])
            {
                // Place Queen
                board[row][c] = 1;

                col[c] = true;
                d1[row - c + n - 1] = true;
                d2[row + c] = true;

                // Recursive call
                if (solve(row + 1))
                {
                    return true;
                }

                // Backtracking
                board[row][c] = 0;

                col[c] = false;
                d1[row - c + n - 1] = false;
                d2[row + c] = false;
            }
        }

        return false;
    }
};

int main()
{
    int n;

    cout << "Enter value of N: ";
    cin >> n;

    NQueens game(n);

    if (game.solve(0))
    {
        game.printBoard();
    }
    else
    {
        cout << "No Solution Exists!\n";
    }

    return 0;
}