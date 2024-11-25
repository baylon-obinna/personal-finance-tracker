import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './ReportGenerator.css';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  item: {
    marginBottom: 5,
    color: '#555',
  },
});

const ReportDocument = ({ transactions, budget, investments }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Transactions</Text>
        {transactions.map(tx => (
          <Text key={tx.id} style={styles.item}>{tx.date} - {tx.category}: ${tx.amount}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Budget</Text>
        {budget.map(b => (
          <Text key={b.id} style={styles.item}>{b.category}: ${b.amount}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Investments</Text>
        {investments.map(inv => (
          <Text key={inv.id} style={styles.item}>{inv.name}: ${inv.value}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

const ReportGenerator = ({ transactions, budget, investments }) => (
  <PDFDownloadLink
    document={<ReportDocument transactions={transactions} budget={budget} investments={investments} />}
    fileName="report.pdf"
    className="download-link"
  >
    {({ loading }) => (loading ? 'Loading report...' : 'Download Report')}
  </PDFDownloadLink>
);

export default ReportGenerator;
