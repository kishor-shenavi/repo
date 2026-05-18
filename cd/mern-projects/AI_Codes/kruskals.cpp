#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

class DisjointSet{
    vector<int> rank;
    vector<int> parent;
public:
    DisjointSet(int n) { // Constructor | n-> No. of nodes of graph
        rank.resize(n+1, 0);
        parent.resize(n+1);
        for(int i=0; i<=n; i++) {
            parent[i] = i;
        }
    }

    int findUPar(int node){
        if(node == parent[node]){
            return node;
        }

        return parent[node] = findUPar(parent[node]);
    }

    void Union(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);

        if(ulp_u == ulp_v) return; // u and v belong to same component

        if(rank[ulp_u] < rank[ulp_v]) {
            parent[ulp_u] = ulp_v;
        }
        else if(rank[ulp_v] < rank[ulp_u]){
            parent[ulp_v] = ulp_u;
        }else{
            parent[ulp_u] = ulp_v;
            rank[ulp_v]++;
        }
    }
};

int kruskalsAlgo(vector<pair<int, pair<int, int>>>& edges, int n, vector<pair<int, int>>& MST){
    int cost = 0;

    // Sort the edges first
    sort(edges.begin(), edges.end());

    DisjointSet ds(n);

    // Add edge to MST
    for(auto edge: edges) {
        int wt = edge.first;
        int u = edge.second.first;
        int v = edge.second.second;

        if(ds.findUPar(u) != ds.findUPar(v)) { // No Cycle then add in MST
            cost += wt;
            MST.push_back(edge.second);
            ds.Union(u, v);
        }
    }
    return cost;
}

int main(){
    vector<pair<int, pair<int, int>>> edges;
    int n, e;

    cout<<"Enter number of nodes and edges: ";
    cin>>n>>e;

    cout<<"Enter edges : (weight | u | v):"<<endl;
    for(int i=0; i<e; i++) {
        int u, v, w;
        cin>>w>>u>>v;

        edges.push_back({w, {u, v}});
    }

    vector<pair<int, int>> MST;
    int MSTCost = kruskalsAlgo(edges, n, MST);

    cout<<"MST Cost: "<<MSTCost<<endl;
    cout<<"\nMinimum Spanning Tree: "<<endl;

    for(auto itr: MST) {
        cout<<itr.first<<"->"<<itr.second<<endl;
    }

    return 0;
}