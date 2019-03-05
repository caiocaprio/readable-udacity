import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../actions/categories";
import "./index.scss";
class Categories extends Component {
  async componentDidMount() {
    const { getCategories } = this.props;
    await getCategories();
  }

  render() {
    const { categories } = this.props;
    return (
      <section>
        <div className="column is-8 is-offset-2">
          <h3 className="title">Tags</h3>
          <div className="tags has-addons ">
            {categories &&
              Object.keys(categories).map((category, i) => {
                const { name, path } = categories[i];
                return (
                  <Link to={`/${path}`} className="tag is-rounded is-info">
                    {name}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    getCategories
  }
)(Categories);
