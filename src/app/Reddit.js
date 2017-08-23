import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

const _Reddit = (props) => (
    <View>
        {props.posts.map((post, i) => (<Text key={i}>{post.name}</Text>))}
    </View>
);

const mapStateToProps = (state) => ({
    posts: state.reddit
})

export const Reddit = connect(mapStateToProps, null)(_Reddit);
