import * as React from 'react';
import * as PropTypes from 'prop-types';
import { render, Artboard, Text, View, StyleSheet } from 'react-sketchapp';

const API_ENDPOINT_URL =
  'https://api.airtable.com/v0/appFs7J3WdgHYCDxD/Features?api_key=keyu4dudakWLI0vAh&&sort%5B0%5D%5Bfield%5D=Target+Launch+Date&sort%5B0%5D%5Bdirection%5D=asc';

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
  },
  dotCompleted: {
    backgroundColor: '#46D2B3',
  },
  title: {
    fontSize: 48,
    fontWeight: 200,
    color: '#000',
  },
  rowContainer: {
    width: 800,
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  rowDescription: {
    fontSize: 16,
    width: 400,
  },
  rowLeftArea: {
    width: 99, // odd number to avoid antialiasing
    alignItems: 'center',
    height: 150,
  },
  rowDate: {
    fontSize: 10,
    color: '#46D2B3',
  },
  rowTitle: {
    fontSize: 20,
  },
});

const VerticalLine = ({ height = 1, color = '#46D2B3' }) => (
  <View style={[styles.verticalLine, { flex: height, backgroundColor: color }]} />
);

VerticalLine.propTypes = {
  height: PropTypes.number,
  color: PropTypes.string,
};

const Header = ({ title }) => (
  <View style={[styles.rowContainer, { backgroundColor: '#fff' }]}>
    <View style={styles.rowLeftArea}>
      <VerticalLine />
    </View>
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
);

Header.propTypes = {
  title: PropTypes.string,
};

const Footer = () => (
  <View style={styles.rowContainer}>
    <View style={styles.rowLeftArea}>
      <VerticalLine height={40} />
    </View>
  </View>
);

const Dot = ({ completed }) => (
  <View name="Dot" style={[styles.dot, completed && styles.dotCompleted]} />
);

Dot.propTypes = {
  completed: PropTypes.bool,
};

const Row = ({
  title, description, completed, date, status,
}) => (
  <View style={styles.rowContainer}>
    <View name="Row Left" style={styles.rowLeftArea}>
      <VerticalLine />
      <Dot completed={completed} />
      <VerticalLine height={4} />
    </View>
    <View name="Row Body" style={{ opacity: completed ? 1 : 0.5 }}>
      <Text name="Row Date" style={styles.rowDate}>
        {`${status} on ${date}`}
      </Text>
      <Text name="Row Title" style={styles.rowTitle}>
        {title}
      </Text>
      <Text name="Row Description" style={styles.rowDescription}>
        {description}
      </Text>
    </View>
  </View>
);

Row.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  completed: PropTypes.bool,
  date: PropTypes.string,
  status: PropTypes.string,
};

const Timeline = props => (
  <Artboard style={styles.artboard}>
    <Header title="Product Timeline" />
    {props.data.records.map(({ id, fields }) => (
      <Row
        key={id}
        title={fields.Feature}
        description={fields['Feature Description']}
        status={fields['Launched?'] ? 'Launched' : fields['Feature Status']}
        completed={fields['Launched?']}
        date={fields['Target Launch Date']}
      />
    ))}
    <Footer />
  </Artboard>
);

Timeline.propTypes = {
  data: PropTypes.shape({
    records: PropTypes.array,
  }),
};

export default () => {
  fetch(API_ENDPOINT_URL)
    .then(res => res.json())
    .then((data) => {
      render(<Timeline data={data} />, context.document.currentPage());
    })
    .catch(e => console.error(e)); // eslint-disable-line no-console
};
