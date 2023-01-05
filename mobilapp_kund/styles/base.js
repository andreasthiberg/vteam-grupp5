import { getCurrentPositionAsync } from "expo-location";

export const container = {
    flex:1,
    justifyContent: 'center',
};

export const base = {
    flex:1,
    padding: 12,
    lineHeight: 1.4,
    color: '#333',
    backgroundColor:"#EFF4F9",
    paddingLeft:12,
    paddingRight:12,
};

export const home = {
    // flex:1,
    padding: 12,
    lineHeight: 1.4,
    color: '#333',
    backgroundColor:"#EFF4F9",
    paddingLeft:12,
    paddingRight:12,
    justifyContent: 'center',
    alignItems: 'center',
};

export const image = {
    width:350,
    height:350,
};

export const btn = {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
};
