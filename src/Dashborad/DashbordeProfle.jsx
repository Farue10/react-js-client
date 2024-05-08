
import { useLoaderData } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DashboardProfile = () => {
    const users = useLoaderData()
   

    // Calculate total number of users
    const totalUsers = users.length;

    // Count active and inactive users
    let activeUsers = 0;
    let inactiveUsers = 0;
    users.forEach(user => {
        if (user.status) {
            activeUsers++;
        } else {
            inactiveUsers++;
        }
    });

    // Count users by role
    const roleCounts = {};
    users.forEach(user => {
        roleCounts[user.role] = roleCounts[user.role] ? roleCounts[user.role] + 1 : 1;
    });

    // Prepare data for role breakdown chart
    const roleData = Object.keys(roleCounts).map(role => ({ role, count: roleCounts[role] }));

    return (
        <div className="">
            <h1>Dashboard Profile</h1>
            {/* Display user statistics */}
            <div>
                <h2>User Statistics</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Bar chart for user status */}
                    <div className='w-32' style={{ width: '45%' }}>
                        <h3>User Status</h3>
                        <ResponsiveContainer  width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={[{ name: 'Active', value: activeUsers }, { name: 'Inactive', value: inactiveUsers }]}
                                    dataKey="value"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {['#0088FE', '#00C49F'].map((color, index) => (
                                        <Cell key={`cell-${index}`} fill={color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <p>Active Users: {activeUsers}</p>
                        <p>Inactive Users: {inactiveUsers}</p>
                    </div>
                    {/* Bar chart for role breakdown */}
                    <div style={{ width: '45%' }}>
                        <h3>Role Breakdown</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={roleData}>
                                <Bar dataKey="count" fill="#8884d8" />
                                <Tooltip />
                            </BarChart>
                        </ResponsiveContainer>
                        <p>Admins: {roleCounts['admin']}</p>
                        <p>Users: {roleCounts['user']}</p>
                    </div>
                </div>
                {/* Display total number of users */}
                <p>Total Users: {totalUsers}</p>
            </div>
        </div>
    );
};

export default DashboardProfile;
