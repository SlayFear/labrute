module.exports = {
  bumpFiles: [
    {
      filename: 'package.json',
    },
    {
      filename: 'client/package.json',
    },
    {
      filename: 'server/package.json',
    },
    {
      filename: 'client/src/utils/Version.ts',
      updater: {
        readVersion: (contents) => contents.match(/!([^!]+)!/)[1],
        writeVersion: (contents, version) => contents.replace(/![^!]+!/, `!${version}!`)
      },
    }
  ],
  types: [
    {
      type: "feat",
      section: "Feature"
    },
    {
      type: "fix",
      section: "Bug fix"
    },
    {
      type: "chore",
      hidden: true
    },
    {
      type: "docs",
      section: "Documentation"
    },
    {
      type: "style",
      section: "Visual update"
    },
    {
      type: "refactor",
      section: "Refactoring"
    },
    {
      type: "perf",
      section: "Performance"
    },
    {
      type: "progress",
      section: "Progress"
    },
    {
      type: "admin",
      section: "Administration"
    },
    {
      type: "test",
      section: "Test"
    }
  ]
};
