#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Edge {
    int src, dest, weight;
};

bool compare(Edge a, Edge b) {
    return a.weight < b.weight;
}

int findParent(int v, vector<int>& parent) {

    if (parent[v] == v)
        return v;

    return findParent(parent[v], parent);
}

void kruskalMST(vector<Edge>& edges, int V) {

    sort(edges.begin(), edges.end(), compare);

    vector<int> parent(V);

    for (int i = 0; i < V; i++) {
        parent[i] = i;
    }

    cout << "Edges in MST:\n";

    for (Edge e : edges) {

        int p1 = findParent(e.src, parent);
        int p2 = findParent(e.dest, parent);

        if (p1 != p2) {

            cout << e.src << " - " << e.dest
                 << " : " << e.weight << endl;

            parent[p1] = p2;
        }
    }
}

int main() {

    int V = 4;

    vector<Edge> edges = {
        {0, 1, 10},
        {0, 2, 6},
        {0, 3, 5},
        {1, 3, 15},
        {2, 3, 4}
    };

    kruskalMST(edges, V);

    return 0;
}