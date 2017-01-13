/* @flow */
import React from 'react';
import ReactMarkdown from 'react-markdown'; // eslint-disable-line import/no-extraneous-dependencies
import { Image, Text, View } from '../../src';
import { fonts } from '../designSystem';

type P = { children: any };

const Paragraph = ({ children }: P) =>
  <Text style={fonts.Body}>{ children }</Text>;

const Span = ({ children }: P) =>
  <Text style={fonts.Body}>{ children }</Text>;

const Emph = ({ children }: P) =>
  <Text style={fonts.Body}>{ children }</Text>;

const Strong = ({ children }: P) =>
  <Text style={{ ...fonts.Body, fontWeight: 'bold' }}>{ children }</Text>;

const List = ({ children }: P) =>
  <View>{ children }</View>;

const HtmlInline = ({ children }: P) =>
  <Text style={fonts.Body}>{ children }</Text>;

const Item = ({ children }: P) =>
  <Text style={{ ...fonts.Body, marginBottom: 0 }}>{ `* ${children}` }</Text>;

const CodeBlock = ({ children }: P) =>
  <View>{ children }</View>;

type HeadingP = {
  children: any,
  level: number,
}
const Heading = ({ children, level }: HeadingP) =>
  <Text
    style={fonts[`Title ${level}`]}
  >
    { children }
  </Text>;

type ImageP = {
  src: string,
};
const ImageEl = ({ src }: ImageP) =>
  <Image
    source={src}
    style={{
      height: 200,
      width: 200,
    }}
  />;

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
  Image: ImageEl,
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
