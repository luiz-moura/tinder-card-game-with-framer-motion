"use client";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { useGameContext } from "@/store/gameContext";
import { card } from "@/types/games.type";

type Props = {
  id: number;
  data: card;
};

const GameCard = ({ id, data }: Props) => {
  const { game, handleSetOptions } = useGameContext();

  const { affirmation } = data;
  const x = useMotionValue(0);

  // useMotionValueEvent(x, "change", (latest) => console.log(`x:${latest}`));

  const inputX = [-400, 0, 400];
  const outputY = [100, 0, 100];
  const outputX = [-200, 0, 200];
  const outputRotate = [-20, 0, 20];

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);

  return (
    <>
      <motion.div
        id={`cardDrivenWrapper-${id}`}
        className="absolute bg-white p-4 rounded-lg text-center w-full aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
          // top: -20 * id,
        }}
      >
        <div id="metrics" className="flex w-full  justify-between">
          <div>1/10</div>
          <div>1</div>
        </div>
        <div
          id="illustration"
          className="w-2/3 mx-auto max-w-[200px] aspect-square rounded-full bg-green-500  mt-4"
        ></div>
        <p id="affirmation" className="mt-6">
          {affirmation}
        </p>
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute bg-blue-500/0 w-full aspect-[100/150] hover:cursor-grab active:cursor-grab select-none`}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.5}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        // onDragEnd={(_, info) => {
        //   console.log("dragEnd");
        //   // setIsDragging(false);

        //   if (handleOnDrag)
        //     handleOnDrag({
        //       action: "end",
        //       id: id,
        //       index: index,
        //       draggableCoords: { x: info.point.x, y: info.point.y },
        //     });
        // }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default GameCard;
