#include <iostream>
#include <vector>
#include <climits>
#include <queue>
using namespace std;

class GreedyAlgorithms
{
public:
    void selectionSort()
    {
        int n;
        cout << "\nEnter number of elements: ";
        cin >> n;
        vector<int> arr(n);

        cout << "Enter elements:\n";
        for (int i = 0; i < n; i++)
        {
            cin >> arr[i];
        }

        for (int i = 0; i < n - 1; i++)
        {
            int minIndex = i;
            for (int j = i + 1; j < n; j++)
            {
                if (arr[j] < arr[minIndex])
                {
                    minIndex = j;
                }
            }

            swap(arr[i], arr[minIndex]);
        }

        cout << "\nSorted Array:\n";

        for (int x : arr)
        {
            cout << x << " ";
        }

        cout << endl;
    }

    void createGraph(vector<vector<pair<int, int>>> &graph, int &n)
    {
        int edges;

        cout << "\nEnter number of vertices: ";
        cin >> n;

        graph.assign(n, {});

        cout << "Enter number of edges: ";
        cin >> edges;

        cout << "Enter edges (source destination weight):\n";

        for (int i = 0; i < edges; i++)
        {
            int u, v, w;

            cin >> u >> v >> w;

            graph[u].push_back({v, w});
            graph[v].push_back({u, w});
        }
    }

    void primMST()
    {
        vector<vector<pair<int, int>>> graph;
        int n;
        createGraph(graph, n);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<bool> inMST(n, false);

        pq.push({0, 0});

        int totalCost = 0;

        cout << "\nEdges included in MST:\n";

        while (!pq.empty())
        {
            auto p = pq.top();
            pq.pop();

            int wt = p.first;
            int u = p.second;

            if (inMST[u])
                continue;

            inMST[u] = true;
            totalCost += wt;

            if (u != 0)
            {
                cout << "Vertex " << u << " with cost " << wt << endl;
            }

            for (auto &edge : graph[u])
            {
                int v = edge.first;
                int w = edge.second;

                if (!inMST[v])
                {
                    pq.push({w, v});
                }
            }
        }

        cout << "\nMinimum Cost of MST = " << totalCost << endl;
    }

    void dijkstra()
    {
        vector<vector<pair<int, int>>> graph;
        int n;
        createGraph(graph, n);
        int source;

        cout << "Enter source vertex: ";
        cin >> source;

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<int> dist(n, INT_MAX);

        dist[source] = 0;
        pq.push({0, source});

        while (!pq.empty())
        {
            int d = pq.top().first;
            int node = pq.top().second;
            pq.pop();

            if (d > dist[node])
            {
                continue;
            }

            for (auto &edge : graph[node])
            {
                int v = edge.first;
                int w = edge.second;

                if (d + w < dist[v])
                {
                    dist[v] = d + w;
                    pq.push({dist[v], v});
                }
            }
        }

        cout << "\nShortest distances from source vertex:\n";

        for (int i = 0; i < n; i++)
        {
            cout << "Vertex " << i << " = " << dist[i] << endl;
        }
    }
};

int main()
{
    GreedyAlgorithms obj;
    int choice;
    do
    {
        cout << "\n========== GREEDY ALGORITHMS ==========\n";
        cout << "1. Selection Sort\n";
        cout << "2. Prim's Minimum Spanning Tree\n";
        cout << "3. Dijkstra Shortest Path\n";
        cout << "4. Exit\n";

        cout << "\nEnter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            obj.selectionSort();
            break;

        case 2:
            obj.primMST();
            break;

        case 3:
            obj.dijkstra();
            break;

        case 4:
            cout << "\nExiting Program...\n";
            break;

        default:
            cout << "\nInvalid Choice!\n";
        }

    } while (choice != 4);

    return 0;
}