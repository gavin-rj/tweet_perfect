// src/components/Header.js
import React from 'react';

const Form = () => {
  return (
    <form className="form-group bg-light p-3 rounded">
    <div className="mb-3">
      <label htmlFor="whitepaper" className="form-label">
        Whitepaper
      </label>
      <textarea
        className="form-control"
        id="whitepaper"
        placeholder="Enter whitepaper"
        rows='3'
      />
    </div>
    <div className="mb-3">
      <label htmlFor="tweetExamples" className="form-label">
        Tweet Examples
      </label>
      <textarea
        className="form-control"
        id="tweetExamples"
        placeholder="Enter tweet examples"
        rows='3'
      />
    </div>
    <div className="mb-3">
      <label htmlFor="socialMediaSite" className="form-label">
        Social Media Site
      </label>
      <select className="form-select" id="socialMediaSite">
        <option>Select a social media site</option>
        <option>Facebook</option>
        <option>Twitter</option>
        <option>Instagram</option>
        <option>LinkedIn</option>
      </select>
    </div>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>
  );
};

export default Form;
