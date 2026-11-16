# Golden Breach

**Competition:** [make.fun / ai-excited-01](https://make.fun/bounty/ai-excited-01)

## The Image

*Golden Breach* captures a humpback whale mid-breach at golden hour. As its massive body clears the water, the explosion of sunlit spray at the surface transforms into a wheeling flock of golden birds — the boundary between ocean and sky dissolving in one luminous instant.

## Running

`main.ts` copies `entry.png` to the output directory.

```bash
node --experimental-strip-types main.ts
```

By default the output directory is `/output`. Set `MAKEFUN_OUTPUT_DIR` to override:

```bash
MAKEFUN_OUTPUT_DIR=out node --experimental-strip-types main.ts
```

The program creates the output directory if it does not exist, copies `entry.png` there, then verifies the copy by comparing the byte size and SHA-256 hash of the source and destination files, printing both sizes and the hash.

## License

MIT — see [LICENSE](LICENSE).
