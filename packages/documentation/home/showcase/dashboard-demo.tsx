import React, { useMemo, useState } from 'react';
import {
  Card,
  Progress,
  Slider,
  DataGrid,
  Tabs,
  Text,
  Button,
} from '@lib';
import { dashboardStats, usersTableData } from './showcase-data';
import styles from './dashboard-demo.module.scss';

interface DashboardState {
  selectedTab: string;
  daysToShow: number;
  sortBy: string;
}

export const DashboardDemo: React.FC = () => {
  const [state, setState] = useState<DashboardState>({
    selectedTab: 'overview',
    daysToShow: 90,
    sortBy: 'recent',
  });

  // Calculate animated stats based on days to show
  const animatedStats = useMemo(
    () =>
      dashboardStats.map((stat) => ({
        ...stat,
        animatedValue: Math.floor(stat.value * (state.daysToShow / 100)),
      })),
    [state.daysToShow],
  );

  const tabLabels = useMemo(() => ['Overview', 'Analytics', 'Reports'], []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return '#22c55e';
      case 'inactive':
        return '#ef4444';
      default:
        return '#3b82f6';
    }
  };

  const dataGridColumns = useMemo(
    () => [
      { name: 'id', width: 80 },
      { name: 'name', width: 150 },
      { name: 'email', width: 200 },
      { name: 'role', width: 120 },
      {
        name: 'status',
        width: 100,
        formatter: (value: string) => (
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: `${getStatusColor(value)}20`,
              color: getStatusColor(value),
            }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <div>
          <h2>Analytics Dashboard</h2>
          <Text type="secondary">Real-time business metrics and insights</Text>
        </div>
        <Button type="default" size="sm" label="Refresh Data" />
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {animatedStats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <Card>
              <div className={styles.cardContent}>
                <Text type="secondary" size="sm">
                  {stat.label}
                </Text>
                <div className={styles.statValue}>
                  {stat.unit}
                  {stat.animatedValue.toLocaleString()}
                </div>
                <div className={styles.statChange}>
                  <span className={stat.change >= 0 ? styles.positive : styles.negative}>
                    {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                  </span>
                  <Text type="secondary" size="xs">
                    vs last period
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Date Range Filter */}
      <Card className={styles.filterCard}>
        <div className={styles.filterContent}>
          <label>Filter by Days to Show</label>
          <Slider
            start={1}
            end={365}
            sliderValue={state.daysToShow}
            onChange={(value) =>
              setState((prev) => ({
                ...prev,
                daysToShow: value,
              }))
            }
          />
          <Text type="secondary" size="sm">
            Showing data for the last {state.daysToShow} days
          </Text>
        </div>
      </Card>

      {/* Tabs */}
      <div className={styles.tabsSection}>
        <Tabs labels={tabLabels} activeTab={state.selectedTab}>
          <Card className={styles.tabContent}>
            <div className={styles.overviewContent}>
              <div className={styles.progressSection}>
                <h3>Monthly Goals</h3>
                <div className={styles.progressItems}>
                  <div className={styles.progressItem}>
                    <Text size="sm">Sales Target: 85%</Text>
                    <Progress value={85} />
                  </div>
                  <div className={styles.progressItem}>
                    <Text size="sm">Customer Growth: 72%</Text>
                    <Progress value={72} />
                  </div>
                  <div className={styles.progressItem}>
                    <Text size="sm">Support Resolution: 95%</Text>
                    <Progress value={95} />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className={styles.tabContent}>
            <div className={styles.analyticsContent}>
              <h3>Traffic Overview</h3>
              <div className={styles.analyticsMetrics}>
                <div className={styles.metricItem}>
                  <Text type="secondary" size="sm">
                    Page Views
                  </Text>
                  <div className={styles.metricValue}>156.4K</div>
                </div>
                <div className={styles.metricItem}>
                  <Text type="secondary" size="sm">
                    Unique Visitors
                  </Text>
                  <div className={styles.metricValue}>42.8K</div>
                </div>
                <div className={styles.metricItem}>
                  <Text type="secondary" size="sm">
                    Bounce Rate
                  </Text>
                  <div className={styles.metricValue}>32.5%</div>
                </div>
                <div className={styles.metricItem}>
                  <Text type="secondary" size="sm">
                    Avg. Session
                  </Text>
                  <div className={styles.metricValue}>4m 28s</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className={styles.tabContent}>
            <div className={styles.reportsContent}>
              <h3>Recent Reports</h3>
              <Text type="secondary" size="sm">
                Monthly performance summary generated on {new Date().toLocaleDateString()}
              </Text>
            </div>
          </Card>
        </Tabs>
      </div>

      {/* Users Table */}
      <Card className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3>Users</h3>
          <Button type="default" size="sm" label="Export" />
        </div>
        <DataGrid
          columns={dataGridColumns}
          data={usersTableData}
          zebra
        />
      </Card>
    </div>
  );
};
