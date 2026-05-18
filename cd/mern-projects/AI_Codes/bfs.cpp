#include<iostream>
#include<vector>
#include<queue>
using namespace std;

void bfs(vector<vector<int>>& adj, vector<int>& visited, queue<int>& q, vector<int>& ans) {
    if(q.empty()) return;

    int node = q.front();
    q.pop();

    ans.push_back(node);

    for(auto nbr : adj[node]) {
        if(visited[nbr] == 0) {
            visited[nbr] = 1;
            q.push(nbr);
        }
    }

    bfs(adj, visited, q, ans);
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
    queue<int> q;
    int seed = 1;

    visited[seed] = 1;
    q.push(seed);

    vector<int> ans;
    bfs(adj, visited, q, ans);

    for(int i : ans){
        cout<<i<<" ";
    }

    return 0;
}