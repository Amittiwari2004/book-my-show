import { client } from "@repo/db/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const users = await client.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>
        Book My Show
      </h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        Users registered in the database
      </p>

      {users.length === 0 ? (
        <div
          style={{
            padding: "30px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          No users found.
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f5f5f5",
                  textAlign: "left",
                }}
              >
                <th style={cellStyle}>ID</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Phone</th>
                <th style={cellStyle}>Avatar</th>
                <th style={cellStyle}>Created At</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={cellStyle}>{user.id}</td>

                  <td style={cellStyle}>
                    {user.name}
                  </td>

                  <td style={cellStyle}>
                    {user.email}
                  </td>

                  <td style={cellStyle}>
                    {user.phone ?? "Not provided"}
                  </td>

                  <td style={cellStyle}>
                    {user.avatarUrl ? (
                      <a
                        href={user.avatarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </td>

                  <td style={cellStyle}>
                    {user.createdAt.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <strong>Total Users:</strong> {users.length}
      </div>
    </main>
  );
}

const cellStyle = {
  padding: "12px 15px",
  borderBottom: "1px solid #ddd",
};