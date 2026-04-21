import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useSurveyFlow } from '../../hooks/useSurveyFlow';
import type { SurveySection } from '../../types/survey';
import './SurveyFlow.css';

// --- Intro screen ---

interface IntroScreenProps {
  isStarted: boolean;
  mascotImage: string;
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ isStarted, mascotImage, onStart }) => (
  <div className="sf-inner">
    <div className="sf-content">
      <h1 className="sf-title">Encuesta</h1>
      <p className="sf-text">
        Queremos conocer los motivos detrás de tu compra. Conforme vayas avanzando en la
        encuesta, tu mascota irá creciendo hasta florecer.
      </p>
      <p className="sf-highlight">¡Descubre todas sus etapas!</p>
      <button className="sf-btn" onClick={onStart}>
        {isStarted ? 'Continuar' : 'Empezar'}
      </button>
    </div>
    <div className="sf-mascot">
      <div className="sf-bubble">
        {isStarted
          ? '¡Dale click al botón de continuar!'
          : '¡Dale click al botón de empezar!'}
      </div>
      <div className="sf-blob" />
      <img src={mascotImage} alt="mascota" className="sf-mascot-img" />
    </div>
  </div>
);

// --- Section screen ---

interface SectionScreenProps {
  section: SurveySection;
  sectionIndex: number;
  totalSections: number;
  mascotImage: string;
  getAnswer: (id: string) => string;
  setAnswer: (id: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  validationError: string;
}

const SectionScreen: React.FC<SectionScreenProps> = ({
  section,
  sectionIndex,
  totalSections,
  mascotImage,
  getAnswer,
  setAnswer,
  onNext,
  onBack,
  validationError,
}) => (
  <div className="sf-inner">
    <div className="sf-content sf-content--wide">
      <h1 className="sf-title">{section.title}</h1>
      <div className="sf-questions">
        {section.questions.map(question => (
          <div key={question.id} className="sf-question">
            <p className="sf-question-label">{question.text}</p>
            {question.options.map(option => (
              <label key={option} className="sf-option">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={getAnswer(question.id) === option}
                  onChange={() => setAnswer(question.id, option)}
                />
                <span className="sf-option-text">{option}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
      {validationError && <p className="sf-error">{validationError}</p>}
      <div className="sf-nav">
        <button className="sf-btn sf-btn--secondary" onClick={onBack}>
          Atrás
        </button>
        <button className="sf-btn" onClick={onNext}>
          {sectionIndex < totalSections - 1 ? 'Siguiente' : 'Finalizar'}
        </button>
      </div>
      <div className="sf-progress">
        {Array.from({ length: totalSections }).map((_, i) => (
          <span
            key={i}
            className={`sf-dot${i === sectionIndex ? ' sf-dot--active' : i < sectionIndex ? ' sf-dot--done' : ''}`}
          />
        ))}
      </div>
    </div>
    <div className="sf-mascot">
      <div className="sf-blob" />
      <img src={mascotImage} alt="mascota" className="sf-mascot-img" />
    </div>
  </div>
);

// --- Thanks screen ---

interface ThanksScreenProps {
  mascotImage: string;
  mascotName: string;
  mascotNamed: boolean;
  setMascotName: (name: string) => void;
  confirmMascotName: () => void;
  onGoHome: () => void;
}

const ThanksScreen: React.FC<ThanksScreenProps> = ({
  mascotImage,
  mascotName,
  mascotNamed,
  setMascotName,
  confirmMascotName,
  onGoHome,
}) => (
  <div className="sf-inner">
    <div className="sf-content">
      <h1 className="sf-title">¡Gracias por participar!</h1>
      {mascotNamed ? (
        <>
          <p className="sf-text">
            <strong>{mascotName}</strong> y el equipo de BloomMarket agradecen tu tiempo.
          </p>
          <p className="sf-text">Tu información nos ayudará a ofrecerte una mejor experiencia.</p>
        </>
      ) : (
        <>
          <p className="sf-text">
            Tu mascota ya está lista para acompañarte. ¿Cómo quieres llamarla?
          </p>
          <input
            className="sf-name-input"
            type="text"
            placeholder="Ingresa el nombre de tu mascota"
            value={mascotName}
            onChange={e => setMascotName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && confirmMascotName()}
          />
        </>
      )}
      <button className="sf-btn" onClick={mascotNamed ? onGoHome : confirmMascotName}>
        Volver a la tienda
      </button>
    </div>
    <div className="sf-mascot">
      <div className="sf-blob" />
      <img src={mascotImage} alt="mascota" className="sf-mascot-img" />
    </div>
  </div>
);

// --- Main page ---

const SurveyFlow: React.FC = () => {
  const navigate = useNavigate();
  const {
    state,
    isStarted,
    currentSection,
    totalSections,
    getMascotImage,
    getAnswerForQuestion,
    setAnswer,
    startSurvey,
    nextSection,
    prevSection,
    setMascotName,
    confirmMascotName,
  } = useSurveyFlow();

  return (
    <>
      <Header />
      <main className="sf-page">
        <div className="sf-card">
          {state.step === 'intro' && (
            <IntroScreen
              isStarted={isStarted}
              mascotImage={getMascotImage()}
              onStart={startSurvey}
            />
          )}
          {state.step === 'section' && currentSection && (
            <SectionScreen
              section={currentSection}
              sectionIndex={state.sectionIndex}
              totalSections={totalSections}
              mascotImage={getMascotImage()}
              getAnswer={getAnswerForQuestion}
              setAnswer={setAnswer}
              onNext={nextSection}
              onBack={prevSection}
              validationError={state.validationError}
            />
          )}
          {state.step === 'thanks' && (
            <ThanksScreen
              mascotImage={getMascotImage()}
              mascotName={state.mascotName}
              mascotNamed={state.mascotNamed}
              setMascotName={setMascotName}
              confirmMascotName={confirmMascotName}
              onGoHome={() => navigate('/home')}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default SurveyFlow;