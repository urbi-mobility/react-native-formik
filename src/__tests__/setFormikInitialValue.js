import React from "react";
import PropTypes from "prop-types";
import { compose, withContext } from "recompose";
import { TextInput } from "react-native";
import { mount } from "enzyme";

import { setFormikInitialValue } from "../..";

console.error = jest.fn();

const setFieldValue = jest.fn();

const withFormikMock = withContext({ formik: PropTypes.object }, () => ({
  formik: {
    setFieldValue
  }
}));
const Input = compose(withFormikMock, setFormikInitialValue)(TextInput);

describe("setFormikInitialValue", () => {
  it("sets the initial value to ''", () => {
    const touchedInput = mount(<Input name="inputName" />);
    expect(setFieldValue).toBeCalledWith("inputName", "");
  });

  it("keeps other props", () => {
    const wrapper = mount(<Input name="inputName" someProp="someValue" />);
    expect(wrapper.find(TextInput).props().someProp).toEqual("someValue");
  });
});
