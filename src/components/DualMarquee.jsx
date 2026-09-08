export default function DualMarquee() {
  const blackItems = ["Agentic AI Development", "Cloud Consulting", "Mobile Application Development"];
  const blueItems = ["ERP Services", "SEO / Digital Marketing", "Website Solutions"];

  const ribbonCopy = (items, group) => {
    const repeatedItems = Array.from({ length: 3 }, () => items).flat();

    return (
      <span className="ribbon-copy" key={group}>
        {repeatedItems.map((item, index) => (
          <span className="ribbon-item" key={`${group}-${index}`}>
            {item}
            <span className="marquee-separator">×</span>
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="ribbon-layer themed-ribbon-layer" aria-hidden="true">
      <div className="ribbon ribbon-black themed-ribbon-dark">
        <div className="ribbon-text-mask">
          <div className="marquee-track-rev">
            {[0, 1].map((group) => ribbonCopy(blackItems, group))}
          </div>
        </div>
      </div>

      <div className="ribbon ribbon-blue themed-ribbon-blue">
        <div className="ribbon-text-mask">
          <div className="marquee-track">
            {[0, 1].map((group) => ribbonCopy(blueItems, group))}
          </div>
        </div>
      </div>

      <style>{`
        .themed-ribbon-layer.ribbon-layer {
          position: relative;
          width: 100%;
          height: clamp(210px, 18vw, 270px);
          margin: 0;
          overflow: hidden;
          background: #ffffff;
          pointer-events: none;
        }

        .themed-ribbon-layer .ribbon {
          position: absolute;
          left: -7%;
          display: flex;
          width: 114%;
          height: clamp(68px, 6vw, 82px);
          align-items: center;
          box-shadow: none;
        }

        .themed-ribbon-layer .themed-ribbon-dark {
          top: clamp(74px, 7vw, 94px);
          z-index: 1;
          color: #ffffff;
          background: #151922;
          transform: rotate(-4.5deg);
        }

        .themed-ribbon-layer .themed-ribbon-blue {
          top: clamp(74px, 7vw, 94px);
          z-index: 2;
          color: #ffffff;
          background: linear-gradient(90deg, #5569c4 0%, #3a83da 54%, #0099ff 100%);
          transform: rotate(4.5deg);
        }

        .themed-ribbon-layer .ribbon-text-mask {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%);
        }

        .themed-ribbon-layer .marquee-track,
        .themed-ribbon-layer .marquee-track-rev {
          display: flex;
          width: max-content;
          flex-shrink: 0;
          align-items: center;
          white-space: nowrap;
          font-family: "Plus Jakarta Sans", "Inter", sans-serif;
          font-size: clamp(22px, 1.8vw, 31px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.038em;
          animation: marquee-anim 30s linear infinite;
          will-change: transform;
        }

        .themed-ribbon-layer .ribbon-copy,
        .themed-ribbon-layer .ribbon-item {
          display: flex;
          flex-shrink: 0;
          align-items: center;
        }

        .themed-ribbon-layer .marquee-separator {
          margin: 0 0.82em;
          font-size: 0.48em;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0;
          opacity: 0.72;
        }

        @media (max-width: 1024px) {
          .themed-ribbon-layer.ribbon-layer {
            height: 190px;
          }

          .themed-ribbon-layer .ribbon {
            left: -11%;
            width: 122%;
            height: 66px;
          }

          .themed-ribbon-layer .themed-ribbon-dark,
          .themed-ribbon-layer .themed-ribbon-blue {
            top: 62px;
          }

          .themed-ribbon-layer .themed-ribbon-dark {
            transform: rotate(-5.5deg);
          }

          .themed-ribbon-layer .themed-ribbon-blue {
            transform: rotate(5.5deg);
          }

          .themed-ribbon-layer .marquee-track,
          .themed-ribbon-layer .marquee-track-rev {
            font-size: 22px;
          }
        }

        @media (max-width: 700px) {
          .themed-ribbon-layer.ribbon-layer {
            height: 150px;
          }

          .themed-ribbon-layer .ribbon {
            left: -20%;
            width: 140%;
            height: 50px;
          }

          .themed-ribbon-layer .themed-ribbon-dark,
          .themed-ribbon-layer .themed-ribbon-blue {
            top: 48px;
          }

          .themed-ribbon-layer .themed-ribbon-dark {
            transform: rotate(-6.5deg);
          }

          .themed-ribbon-layer .themed-ribbon-blue {
            transform: rotate(6.5deg);
          }

          .themed-ribbon-layer .marquee-track,
          .themed-ribbon-layer .marquee-track-rev {
            font-size: 16.5px;
            letter-spacing: -0.03em;
          }
        }

        @media (max-width: 380px) {
          .themed-ribbon-layer.ribbon-layer {
            height: 138px;
          }

          .themed-ribbon-layer .ribbon {
            height: 46px;
          }

          .themed-ribbon-layer .themed-ribbon-dark,
          .themed-ribbon-layer .themed-ribbon-blue {
            top: 44px;
          }

          .themed-ribbon-layer .marquee-track,
          .themed-ribbon-layer .marquee-track-rev {
            font-size: 15.5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .themed-ribbon-layer .marquee-track,
          .themed-ribbon-layer .marquee-track-rev {
            animation: none;
            will-change: auto;
          }
        }
      `}</style>
    </div>
  );
}
