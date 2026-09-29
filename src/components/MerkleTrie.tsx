import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { fnv1a } from "../lib/hash";
import { prefersReducedMotion } from "../lib/hooks";

// A binary Merkle trie over 3-bit keys, stored heap-style:
// node 1 is the root, node n has children 2n and 2n+1, leaves are 8..15.
const DEPTH = 3;
const LEAVES = 1 << DEPTH;
const INITIAL_VALUES = [12, 7, 31, 4, 19, 26, 3, 15];
const STEP_MS = 150;
const AUTO_WRITE_MS = 2800;
const USER_IDLE_MS = 9000;

const W = 520;
const LEVEL_Y = [30, 100, 170, 240];
const BOX_W = [168, 96, 76, 56];
const BOX_H = [34, 30, 30, 30];

const keyOf = (leaf: number) => leaf.toString(2).padStart(DEPTH, "0");
const levelOf = (node: number) => 31 - Math.clz32(node);

function nodeX(node: number) {
  const level = levelOf(node);
  const slot = W / (1 << level);
  return slot * (node - (1 << level) + 0.5);
}

function buildHashes(values: number[]): string[] {
  const h = new Array<string>(2 * LEAVES).fill("");
  for (let i = 0; i < LEAVES; i++) h[LEAVES + i] = fnv1a(`${keyOf(i)}=${values[i]}`);
  for (let n = LEAVES - 1; n >= 1; n--) h[n] = fnv1a(h[2 * n] + h[2 * n + 1]);
  return h;
}

/** Nodes from the leaf up to the root. */
function pathFrom(leaf: number): number[] {
  const out: number[] = [];
  for (let n = LEAVES + leaf; n >= 1; n >>= 1) out.push(n);
  return out;
}

/** Sibling hashes needed to prove a leaf is included under the root. */
function proofFor(leaf: number): number[] {
  return pathFrom(leaf)
    .slice(0, -1)
    .map((n) => n ^ 1);
}

const INITIAL_HASHES = buildHashes(INITIAL_VALUES);

type LogLine = { id: number; key: string; value: number; root: string };

export function MerkleTrie() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [shown, setShown] = useState(INITIAL_HASHES);
  const [flash, setFlash] = useState<number[]>(() => new Array(2 * LEAVES).fill(0));
  const [focusLeaf, setFocusLeaf] = useState<number | null>(null);
  const [log, setLog] = useState<LogLine[]>([]);
  const [announce, setAnnounce] = useState("");

  const valuesRef = useRef(values);
  const timers = useRef(new Set<number>());
  const lastUserWrite = useRef(0);
  const logId = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const write = useCallback((leaf: number, byUser: boolean) => {
    if (byUser) lastUserWrite.current = Date.now();

    const next = [...valuesRef.current];
    next[leaf] = (next[leaf] + 1 + Math.floor(Math.random() * 9)) % 100;
    valuesRef.current = next;
    setValues(next);

    const hashes = buildHashes(next);
    const path = pathFrom(leaf);
    const instant = prefersReducedMotion();

    path.forEach((node, step) => {
      const t = window.setTimeout(
        () => {
          timers.current.delete(t);
          setShown((prev) => {
            const copy = [...prev];
            copy[node] = hashes[node];
            return copy;
          });
          setFlash((prev) => {
            const copy = [...prev];
            copy[node] = prev[node] + 1;
            return copy;
          });
          if (node === 1) {
            const line = { id: ++logId.current, key: keyOf(leaf), value: next[leaf], root: hashes[1] };
            setLog((prev) => [line, ...prev].slice(0, 3));
            if (byUser) setAnnounce(`Wrote ${line.value} to key ${line.key}. New root hash ${line.root}.`);
          }
        },
        instant ? 0 : step * STEP_MS
      );
      timers.current.add(t);
    });
  }, []);

  // Idle demo: write to a random leaf every few seconds while the trie is on
  // screen, the tab is visible, and the visitor isn't driving it themselves.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    if (rootRef.current) io.observe(rootRef.current);

    const interval = window.setInterval(() => {
      if (!visible || document.hidden) return;
      if (Date.now() - lastUserWrite.current < USER_IDLE_MS) return;
      write(Math.floor(Math.random() * LEAVES), false);
    }, AUTO_WRITE_MS);

    const pending = timers.current;
    return () => {
      io.disconnect();
      window.clearInterval(interval);
      pending.forEach(window.clearTimeout);
    };
  }, [write]);

  const proof = focusLeaf === null ? [] : proofFor(focusLeaf);
  const focusPath = focusLeaf === null ? [] : pathFrom(focusLeaf);

  const onLeafKey = (e: KeyboardEvent, leaf: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      write(leaf, true);
    }
  };

  const nodes = Array.from({ length: 2 * LEAVES - 1 }, (_, i) => i + 1);

  return (
    <div className="trie" ref={rootRef}>
      <div className="trie__bar">
        <span className="trie__live">
          <span className="trie__dot" aria-hidden="true" />
          merkle trie · live
        </span>
        <span className="trie__meta">8 keys · depth 3</span>
      </div>

      <svg
        className="trie__svg"
        viewBox={`0 0 ${W} 300`}
        role="group"
        aria-label="Interactive Merkle trie. Each leaf is a button that writes a new value; hashes are recomputed up to the root."
      >
        {/* Edges, labelled with the key bit they consume. */}
        {nodes
          .filter((n) => n > 1)
          .map((n) => {
            const parent = n >> 1;
            const pl = levelOf(parent);
            const cl = levelOf(n);
            const x1 = nodeX(parent);
            const y1 = LEVEL_Y[pl] + BOX_H[pl] / 2;
            const x2 = nodeX(n);
            const y2 = LEVEL_Y[cl] - BOX_H[cl] / 2;
            const my = (y1 + y2) / 2;
            const onPath = focusPath.includes(n);
            return (
              <g key={`e${n}`} className={`trie__edge${onPath ? " is-path" : ""}`}>
                <path d={`M${x1} ${y1} C${x1} ${my} ${x2} ${my} ${x2} ${y2}`} />
                <text x={(x1 + x2) / 2 + (n & 1 ? 7 : -7)} y={my + 4} textAnchor="middle" className="trie__bit">
                  {n & 1}
                </text>
              </g>
            );
          })}

        {nodes.map((n) => {
          const level = levelOf(n);
          const isLeaf = level === DEPTH;
          const leaf = n - LEAVES;
          const w = BOX_W[level];
          const h = BOX_H[level];
          const x = nodeX(n) - w / 2;
          const y = LEVEL_Y[level] - h / 2;
          const hash = shown[n];
          const label = n === 1 ? `root ${hash}` : hash.slice(0, 4);

          const cls = [
            "trie__node",
            isLeaf && "is-leaf",
            n === 1 && "is-root",
            proof.includes(n) && "is-proof",
            focusPath.includes(n) && "is-path"
          ]
            .filter(Boolean)
            .join(" ");

          const body = (
            <>
              <rect x={x} y={y} width={w} height={h} rx={7} className="trie__box" />
              {flash[n] > 0 && (
                <rect key={flash[n]} x={x} y={y} width={w} height={h} rx={7} className="trie__flash" />
              )}
              <text x={nodeX(n)} y={LEVEL_Y[level] + 4.5} textAnchor="middle" className="trie__hash">
                {label}
              </text>
            </>
          );

          if (!isLeaf) {
            return (
              <g key={n} className={cls}>
                {body}
              </g>
            );
          }

          return (
            <g
              key={n}
              className={cls}
              role="button"
              tabIndex={0}
              aria-label={`Key ${keyOf(leaf)}, value ${values[leaf]}, hash ${shown[n].slice(0, 4)}`}
              aria-describedby="trie-leaf-help"
              onClick={() => {
                setFocusLeaf(leaf);
                write(leaf, true);
              }}
              onKeyDown={(e) => onLeafKey(e, leaf)}
              onMouseEnter={() => setFocusLeaf(leaf)}
              onMouseLeave={() => setFocusLeaf(null)}
              onFocus={() => setFocusLeaf(leaf)}
              onBlur={() => setFocusLeaf(null)}
            >
              {/* Larger invisible hit area for touch. */}
              <rect x={nodeX(n) - W / LEAVES / 2} y={y - 6} width={W / LEAVES} height={h + 52} className="trie__hit" />
              {body}
              <text x={nodeX(n)} y={LEVEL_Y[level] + 32} textAnchor="middle" className="trie__key">
                {keyOf(leaf)}
              </text>
              <text x={nodeX(n)} y={LEVEL_Y[level] + 47} textAnchor="middle" className="trie__val">
                {values[leaf]}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="trie__console" aria-hidden="true">
        {focusLeaf !== null ? (
          <p className="trie__line trie__line--proof">
            <span className="trie__prompt">proof</span> key {keyOf(focusLeaf)} ={" "}
            {proof.map((n) => shown[n].slice(0, 4)).join(" + ")} → root {shown[1].slice(0, 8)}
          </p>
        ) : (
          <p className="trie__line trie__line--hint">
            <span className="trie__prompt">tip</span>
            <span className="trie__hint--pointer">click a leaf to write · hover for its proof</span>
            <span className="trie__hint--touch">tap a leaf to write it and see its proof</span>
          </p>
        )}
        {log.map((line) => (
          <p key={line.id} className="trie__line">
            <span className="trie__prompt">put</span> {line.key} = {String(line.value).padStart(2, " ")}{" "}
            <span className="trie__arrow">→</span> root {line.root}
          </p>
        ))}
      </div>

      <p className="sr-only" id="trie-leaf-help">
        Press Enter to write a new value to this key and re-hash its path to the root.
      </p>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
