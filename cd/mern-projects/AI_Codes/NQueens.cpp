#include<iostream>
#include<vector>
using namespace std;

vector<vector<string>> solutions;

void NQueens(int row, vector<string>& board, int n, vector<bool>& columns, vector<bool>& ndiag, vector<bool>& rdiag) {
    if(row == n){
        solutions.push_back(board);
        return;
    } 

    for(int col=0; col<n; col++) {
        if(columns[col] || ndiag[row + col] || rdiag[row - col + n - 1]) continue;

        board[row][col] = 'Q';
        columns[col] = ndiag[row + col] = rdiag[row - col + n - 1] = true;

        NQueens(row+1, board, n, columns, ndiag, rdiag);

        board[row][col] = '.';
        columns[col] = ndiag[row + col] = rdiag[row - col + n - 1] = false;
    }
}

int main() {
    int n = 4;
    vector<string> board(n, string(n, '.'));

    vector<bool> columns(n, false); // Block that column
    vector<bool> ndiag(2*n - 1, false); // Block that row+col diagonal
    vector<bool> rdiag(2*n - 1, false); // Block that row - col + n - 1 diagonal

    NQueens(0, board, n, columns, ndiag, rdiag);
    
    for(auto board : solutions) {
        for(string row : board) {
            cout<<row<<endl;
        }
        cout<<endl;
    }

    return 0;
}
