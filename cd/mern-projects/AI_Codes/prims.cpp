#include<iostream>
#include<vector>
#include<queue>
using namespace std;



int prims(vector<vector<pair<int, int>>>& adj,
    vector<int>& visited,
    vector<pair<int, int>>& MST) {


    int seed = 0;
    priority_queue<pair<int, pair<int, int>>, vector<pair<int, pair<int, int>>>
    , greater<pair<int, pair<int, int>>>> pq; // min heap

    pq.push({0, {seed, -1}});
    int cost = 0;

    while(!pq.empty()) {
        auto itr = pq.top();
        pq.pop();

        int node = itr.second.first;
        int wt = itr.first;
        int parent = itr.second.second;
        
        if(visited[node] == 1) continue;

        visited[node] = 1;
        cost += wt;
        
        if(parent != -1) MST.push_back(itr.second);
        
        for(auto& nbr : adj[node]) {
            int adjDist = nbr.first;
            int adjNode = nbr.second;

            if(visited[nbr.second] == 0) {
                pq.push({adjDist, {adjNode, node}});
            }
        }
        
    }
    return cost;
}

int main() {
    int n = 5;
    vector<vector<pair<int, int>>> adj(n); // node -> {dist, adjNode}
    adj[0].push_back({2,1});
    adj[0].push_back({1, 2});

    adj[1].push_back({2, 0});
    adj[1].push_back({1, 2});

    adj[2].push_back({1, 0});
    adj[2].push_back({1, 1});
    adj[2].push_back({2, 4});
    adj[2].push_back({2, 3});

    adj[3].push_back({2, 2});
    adj[3].push_back({1, 4});

    adj[4].push_back({2, 2});
    adj[4].push_back({1, 3});

    vector<int> visited(n,0);

    vector<pair<int, int>> MST;

    int cost = prims(adj,visited, MST);

    cout<<"Cost of MST = "<<cost<<endl;

    for(auto& p:MST) {
        cout<<p.first<<" -> "<<p.second<<endl;
    }

    return 0;
}
