#include<iostream>
#include<vector>
using namespace std;

void dfs(vector<vector<int>>& adj, vector<int>& visited, int seed, vector<int>& ans) {
    visited[seed] = 1;
    ans.push_back(seed);
    for(auto nbr : adj[seed]) {
        if(visited[nbr] == 0){
            dfs(adj, visited, nbr, ans);
        }
    }
}

int main() {
    int n = 9;
    vector<vector<int>> adj(n+1);
    adj[1] = {2, 6};
    adj[2] = {1, 3, 4};
    adj[3] = {2};
    adj[4] = {2, 5};
    adj[5] = {4, 8};
    adj[6] = {1, 7, 9};
    adj[7] = {6, 8};
    adj[8] = {5, 7};
    adj[9] = {6};

    vector<int> visited(n+1, 0);
    int seed = 1;

    vector<int> ans;
    dfs(adj, visited, seed, ans);

    for(int i : ans){
        cout<<i<<" ";
    }

    return 0;
}