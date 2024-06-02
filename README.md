# Security Event Dashboard

## Overview

This project involves creating a dashboard using the provided dummy data in `eve.json`. The dashboard is designed with a dark theme and includes multiple beautiful and responsive graphs. The goal is to think from the user's perspective and provide insightful visualizations of the security event data.

## Data Description

The provided data is a JSON file (`eve.json`) containing various security event logs. Each event log includes information such as:
- `event_type`: The type of the event.
- `alert`: Details of the alert, including:
  - `signature`: The signature of the alert.
  - `severity`: The severity level of the alert.
- `src_ip`: The source IP address.
- `dest_ip`: The destination IP address.
- `timestamp`: The time at which the event occurred.

## Steps Taken

### Data Processing

1. **Parsing and Aggregation**:
   - The JSON data was parsed to extract relevant information like event types, alert signatures, severities, source IPs, and destination IPs.
   - These data points were aggregated to prepare them for visualization.

### Chart.js and React Integration

2. **Library Usage**:
   - Utilized `Chart.js` through `react-chartjs-2` to render various types of charts.
   - Registered necessary chart components such as Bar, Line, Pie, Doughnut, and Radar charts.

### Graph Implementations

3. **Visualizations**:
   - **Bar Chart**: Displays the distribution of different event types.
   - **Pie Chart**: Shows the distribution of alert signatures.
   - **Line Chart**: Represents the severity levels of the alerts over time.
   - **Doughnut Chart**: Illustrates thhttps://github.com/AadityaPandey30e frequency of source IP addresses involved in the events.
   - **Radar Chart**: Compares the destination IP addresses involved in the events.

### User Interface

4. **Dashboard Design**:
   - Implemented a dark-themed, responsive dashboard using Tailwind CSS for styling.
   - Included user-friendly elements like headings and section titles for better clarity.
   - Added date filters to allow users to customize the data range for the visualizations.

### Enhancements

5. **User-Centric Features**:
   - Enhanced tooltips for detailed information on data points.
   - Introduced filtering options using date to improve data interactivity and customization.
   - Focused on accessibility and performance to ensure a broader user base could effectively use the dashboard.

## Summary of Visualizations

- **Event Types (Bar Chart)**: Visualizes the frequency of different types of security events.
- **Signatures (Pie Chart)**: Shows the proportion of different alert signatures.
- **Severities (Line Chart)**: Illustrates the distribution of alert severities over time.
- **Source IPs (Doughnut Chart)**: Displays the distribution of source IP addresses involved in the events.
- **Destination IPs (Radar Chart)**: Compares the distribution of destination IP addresses.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AadityaPandey30/InteractiveDashboard
