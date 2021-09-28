import React from "react";

import CollapseView from "components/common/CollapseView";

import styles from "./TeamDetail.module.css";

const Calendar = ({ calendar }) => {
  return (
    <section>
      <CollapseView summary={<h3 className="title">Calendar</h3>}>
        <ul>
          {calendar?.map((game) => {
            return <li>TEST</li>;
          })}
        </ul>
      </CollapseView>
    </section>
  );
};

export default Calendar;
