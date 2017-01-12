/* @flow */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Text, View } from '../../src';
import { fonts } from '../designSystem';

const Paragraph = ({ children }) =>
  <Text style={fonts.Body}>{ children }</Text>;


const Span = ({ children }) =>
  <Text style={fonts.Body}>{ children }</Text>;


const Emph = ({ children }) =>
  <Text style={fonts.Body}>{ children }</Text>;


const Strong = ({ children }) =>
  <Text style={{ ...fonts.Body, fontWeight: 'bold' }}>{ children }</Text>;


const List = ({ children }) =>
  <View>{ children }</View>;


const HtmlInline = ({ children }) =>
  <Text style={fonts.Body}>{ children }</Text>;


const Item = ({ children }) =>
  <Text style={{ ...fonts.Body, marginBottom: 0 }}>{ `* ${children}` }</Text>;

const CodeBlock = ({ children }) =>
  <View>{ children }</View>;

const Heading = ({ children, level }) =>
  <Text
    style={fonts[`Title ${level}`]}
  >
    { children }
  </Text>;

const Image = () => null;

const renderers = {
  Paragraph,
  Span,
  Emph,
  Strong,
  List,
  HtmlInline,
  Item,
  CodeBlock,
  Heading,
  Image,
};


type Props = {
  style?: {[key: string]: string | number},
  source: string,
}

const Markdown = ({
  style,
  source,
}: Props) =>
  <ReactMarkdown
    containerTagName="view"
    containerProps={{ style }}
    source={source}
    renderers={renderers}
  />;

export default Markdown;
