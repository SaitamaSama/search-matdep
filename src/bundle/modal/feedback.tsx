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
  zIndex: `100`,
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
  // margin: "0 .5rem",
  // borderRadius: 5,
  borderRight: "none",
  ":first-child": {
    marginLeft: 0,
  },
  ":last-child": {
    marginRight: 0,
    borderRight: "1px solid #efefef",
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

const Input = styled.input({
  width: "100%",
  border: "1px solid #efefef",
  outline: "none",
  resize: "none",
  fontSize: "1rem",
  fontFamily: "inherit",
  color: "#fff",
  background: "transparent",
  borderRadius: 5,
  padding: ".5rem 1.2rem",
  marginBottom: ".75rem",
});

const PhoneInputForm = styled.form({
  flexGrow: 1,
  marginRight: 0,
  "@media (min-width:761px)": {
    marginRight: "1rem",
  },
});

const FooterActions = styled.footer({
  display: "flex",
  padding: "1rem 0 0",
  marginTop: "1.5rem",
});

export interface SubmitButtonProps {
  small?: boolean;
}
const SubmitButton = styled.button<SubmitButtonProps>(({ small }) => ({
  padding: small ? ".2rem 1.2rem" : ".6rem 2.5rem",
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  outline: "none",
  cursor: "pointer",
  fontSize: small ? ".75rem" : "1rem",
  fontFamily: "inherit",
  borderRadius: 5,
}));

const FeedbackResponse = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  "@media (min-width:761px)": {
    gridTemplateColumns: "1fr 2fr",
  },
});

const FeedbackResponseText = styled.div({
  fontSize: "0.9rem",
  padding: "0 1rem",
  "@media (min-width:761px)": {
    padding: "0 10%",
  },
});

export interface FeedbackModalProps {
  onClose: () => unknown;
}

export const FeedbackModal = (props: FeedbackModalProps) => {
  const [score, setScore] = React.useState<number>();
  const [message, setMessage] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [entryId, setEntryId] = React.useState<number>();
  const [formDone, setFormDone] = React.useState(false);

  const supabaseClient = React.useRef(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    supabase.createClient(
      "https://zkislemuvfreiovldjlb.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTA2ODcwOCwiZXhwIjoxOTU0NjQ0NzA4fQ.9WDtKcZAqva9vCSw2eWGbnYJfzcWawT2GLSpJZhkynU",
    ),
  );

  const submitFeedback = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(
      Array.from(urlSearchParams).filter((a) => a[0].includes("utm")),
    );
    supabaseClient.current
      ?.from("SearchFeedback")
      .insert([{ feedback: message, score, ...params }])
      .then((response: unknown) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const id = response.data[0].id;
        if (id) {
          setEntryId(id);
        }
      })
      .finally(() => {
        setDone(true);
      });
  };

  const formSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    supabaseClient.current
      ?.from("SearchFeedback")
      .update({ phone })
      .match({ id: entryId })
      .then((response: unknown) => response)
      .finally(() => {
        setFormDone(true);
      });
  };

  const phoneForm = () => {
    if (formDone) {
      return (
        <PhoneInputForm onSubmit={(ev) => ev.preventDefault()}>
          <small>
            Thank you for taking the time to provide your feedback. We will
            contact you shortly.
          </small>
        </PhoneInputForm>
      );
    }

    return (
      <PhoneInputForm onSubmit={formSubmit}>
        <small>
          Share your phone number with us if you want to be contacted by us
          regarding your feedback
        </small>
        <br />
        <b>
          <small>Phone number</small>
        </b>
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
        />
        <br />
        <SubmitButton small type="submit">
          Submit
        </SubmitButton>
      </PhoneInputForm>
    );
  };

  const renderModalContent = () => {
    if (done) {
      if (Number(score) >= 8)
        return (
          <>
            <ModalHeader>Thanks for survey</ModalHeader>
            <FeedbackResponse>
              {phoneForm()}
              <FeedbackResponseText>
                Thanks for your feedback. It&apos;s great to hear that
                you&apos;re a fan of (our company or product). Your feedback
                helps us discover new opportunities to improve (our company or
                product) and make sure you have the best possible experience.
              </FeedbackResponseText>
            </FeedbackResponse>
          </>
        );

      if (Number(score) >= 5)
        return (
          <>
            <ModalHeader>Thanks for survey</ModalHeader>
            <FeedbackResponse>
              {phoneForm()}
              <FeedbackResponseText>
                Thanks for your feedback. Our goal is to create the best
                possible product, and your thoughts, ideas and suggestions play
                a major role in helping us identify opportunities to improve.
              </FeedbackResponseText>
            </FeedbackResponse>
          </>
        );

      return (
        <>
          <ModalHeader>Thanks for survey</ModalHeader>
          <FeedbackResponse>
            {phoneForm()}
            <FeedbackResponseText>
              Thanks for your feedback. We highly value all ideas and
              suggestions from our customers, whether they&apos;re positive or
              critical. In the future, our team might reach out to you to learn
              more about how we can improve further improve (our product or
              service) so that it exceeds your expectations.
            </FeedbackResponseText>
          </FeedbackResponse>
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
                : "How did we disappoint you and what can we do to make things right?"}
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
