import React from 'react';
import { render, Artboard, Text, View, StyleSheet } from 'react-sketchapp';

const API_ENDPOINT_URL = 'https://api.airtable.com/v0/appFs7J3WdgHYCDxD/Features?api_key=keyKPNRi8BoNPPBWR&&sort%5B0%5D%5Bfield%5D=Target+Launch+Date&sort%5B0%5D%5Bdirection%5D=asc';

const styles = StyleSheet.create({
  artboard: {
    backgroundColor: '#F9FDFF',
  },
  verticalLine: {
    width: 3,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#46D2B3',
    margin: 2,
  },
  dotCompleted: {
    backgroundColor: '#46D2B3',
  },
  rowContainer: {
    width: 800,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: 200,
    color: '#000',
  },
  rowLeftArea: {
    width: 100,
    alignItems: 'center',
  },
  rowDate: {
    fontSize: 10,
    color: '#46D2B3',
  },
  rowTitle: {
    fontSize: 20,
  },
});

const VerticalLine = ({ height, color = '#46D2B3' }) => (
  <View style={[styles.verticalLine, { height, backgroundColor: color }]} />
);

const Header = ({ title }) => (
  <View style={[styles.rowContainer, { backgroundColor: '#fff' }]}>
    <View style={styles.rowLeftArea}>
      <VerticalLine height={120} />
    </View>
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
);

const Footer = () => (
  <View style={styles.rowContainer}>
    <View style={styles.rowLeftArea}>
      <VerticalLine height={40} />
    </View>
  </View>
);

const Row = ({ title, completed, date, status }) => (
  <View style={styles.rowContainer}>
    <View style={styles.rowLeftArea}>
      <VerticalLine height={30} />
      <View style={[styles.dot, completed && styles.dotCompleted]} />
      <VerticalLine height={30} />
    </View>
    <View style={{opacity: completed ? 1 : 0.5 }}>
      <Text style={styles.rowDate}>{`${status} on ${date}`}</Text>
      <Text style={styles.rowTitle}>{title}</Text>
    </View>
  </View>
);

const Timeline = ({ data }) => (
  <Artboard style={styles.artboard}>
    <Header title='Product Timeline' />
    {
      data.records.map(({ id, fields }, index) => {
        return (
          <Row
            key={id}
            topLineHeight={24}
            bottomLineHeight={48}
            title={fields['Feature']}
            status={fields['Launched?'] ? 'Launched' : fields['Feature Status']}
            completed={fields['Launched?']}
            date={fields['Target Launch Date']}
          />
        );
      })
    }
    <Footer />
  </Artboard>
);

export default (context) => {
  fetch(API_ENDPOINT_URL)
    .then(res => res.json())
    .then((data) => {
      render(<Timeline data={data} />, context.document.currentPage());
    })
    .catch(e => console.error(e));
};
