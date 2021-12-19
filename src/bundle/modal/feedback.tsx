import styled from "@emotion/styled";
import * as React from "react";

const ModalContainer = styled.section({
  background: `rgba(0, 0, 0, .2)`,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: `fixed`,
  display: `flex`,
  justifyContent: `center`,
  paddingTop: `10vh`,
});

const Modal = styled.div({
  width: "95vw",
  height: "auto",
  padding: "1rem",
  borderRadius: 5,
  background: "#303030",
  "@media (min-width:761px)": {
    width: "80vw",
  },
  "@media (min-width:1080px)": {
    width: "70vw",
  },
});

const ModalHeader = styled.div({
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: "#fff",
  marginBottom: "1rem",
  padding: "1rem 0",
});

const ModalBodyButtonContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
});
export interface ScoreButtonProps {
  selected?: boolean;
}

const ScoreButton = styled.button((props: ScoreButtonProps) => ({
  padding: "1rem",
  border: "1px solid #efefef",
  flexGrow: 1,
  background: props.selected ? "#4CAF50" : "transparent",
  color: "#fff",
  outline: "none",
  cursor: "pointer",
  fontSize: "1rem",
  fontFamily: "inherit",
  margin: "0 .5rem",
  borderRadius: 5,
  ":first-child": {
    marginLeft: 0,
  },
  ":last-child": {
    marginRight: 0,
  },
}));

const TextArea = styled.textarea({
  width: "100%",
  height: "10rem",
  padding: "1rem",
  border: "1px solid #efefef",
  outline: "none",
  resize: "none",
  fontSize: "1rem",
  fontFamily: "inherit",
  color: "#fff",
  background: "transparent",
  borderRadius: 5,
});

const FooterActions = styled.footer({
  display: "flex",
  padding: "1rem 0 0",
  marginTop: "1.5rem",
});

const SubmitButton = styled.button({
  padding: ".6rem 2.5rem",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  outline: "none",
  cursor: "pointer",
  fontSize: "1rem",
  fontFamily: "inherit",
  borderRadius: 5,
});

export interface FeedbackModalProps {
  onClose: () => unknown;
}

export const FeedbackModal = (props: FeedbackModalProps) => {
  const [score, setScore] = React.useState<number>();
  const [message, setMessage] = React.useState("");
  const [done, setDone] = React.useState(false);

  const submitFeedback = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const supabaseClient = supabase.createClient(
      "https://zkislemuvfreiovldjlb.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA2ODcwOCwiZXhwIjoxOTU0NjQ0NzA4fQ.9WDtKcZAqva9vCSw2eWGbnYJfzcWawT2GLSpJZhkynU",
    );
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(
      Array.from(urlSearchParams).filter((a) => a[0].includes("utm")),
    );
    supabaseClient
      .from("SearchFeedback")
      .insert([{ feedback: message, score, ...params }])
      .then((response: unknown) => response)
      .finally(() => {
        setDone(true);
      });
  };

  const renderModalContent = () => {
    if (done) {
      return (
        <>
          <ModalHeader>Thanks for survey</ModalHeader>
          <p style={{ width: "60%" }}>
            Thanks for your feedback. It&apos;s great to hear that you&apos;re a
            fan of (our company or product). Your feedback helps us discover new
            opportunities to improve (our company or product) and make sure you
            have the best possible experience.
          </p>
        </>
      );
    }
    return (
      <>
        <ModalHeader>Material Depot Feedback</ModalHeader>
        <p>
          <b>Rate us</b>
          <br />
          On a scale 0-10, How likely are you to recommend our product to a
          friend or colleague?
        </p>
        <ModalBodyButtonContainer>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <ScoreButton
              key={i}
              onClick={() => setScore(i)}
              selected={score === i}
            >
              {i}
            </ScoreButton>
          ))}
        </ModalBodyButtonContainer>
        <section style={{ display: "flex", marginTop: "1rem" }}>
          <span>Not likely</span>
          <div style={{ flexGrow: 1 }} />
          <span>Extremely Likely</span>
        </section>
        {score !== undefined && (
          <section style={{ marginTop: "1.5rem" }}>
            <b>
              {score > 6
                ? "What was missing and what can we do to improve this experience?"
                : "How did we disappint you and what can we do to make things right?"}
            </b>
            <br />
            <TextArea
              value={message}
              onChange={(ev) => setMessage(ev.target.value)}
            />
          </section>
        )}
        <FooterActions>
          <SubmitButton onClick={() => submitFeedback()}>
            Submit query
          </SubmitButton>
        </FooterActions>
      </>
    );
  };

  return (
    <ModalContainer onClick={props.onClose}>
      <section>
        <Modal onClick={(ev) => ev.stopPropagation()}>
          {renderModalContent()}
        </Modal>
      </section>
    </ModalContainer>
  );
};
