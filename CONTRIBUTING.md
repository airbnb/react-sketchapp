# Contributing

Contributions are welcome and are greatly appreciated! Every little bit helps, and credit will always be given. By contributing, you agree to abide by the [code of conduct](https://github.com/airbnb/react-sketchapp/blob/master/CODE_OF_CONDUCT.md).

## Reporting Issues and Asking Questions

**For support or usage questions like “how do I do X with react-sketchapp” and “my code doesn't work”, please search and ask on [StackOverflow with a react-sketchapp tag](http://stackoverflow.com/questions/tagged/react-sketchapp?sort=votes&pageSize=50) first.**

We ask you to do this because StackOverflow has a much better job at keeping popular questions visible. Unfortunately good answers get lost and outdated on GitHub.

Some questions take a long time to get an answer. **If your question gets closed or you don't get a reply on StackOverflow for longer than a few days,** we encourage you to post an issue linking to your question. We will close your issue but this will give people watching the repo an opportunity to see your question and reply to it on StackOverflow if they know the answer.

Please be considerate when doing this as this is not the primary purpose of the issue tracker.

### Help Us Help You

On both websites, it is a good idea to structure your code and question in a way that is easy to read to entice people to answer it. For example, we encourage you to use syntax highlighting, indentation, and split text in paragraphs.

Please keep in mind that people spend their free time trying to help you. You can make it easier for them if you provide versions of the relevant libraries and a runnable small project reproducing your issue. You can put your code on [JSBin](http://jsbin.com) or, for bigger projects, on GitHub. Make sure all the necessary dependencies are declared in `package.json` so anyone can run `npm install && npm start` and reproduce your issue.

## Development
Visit the [issue tracker](https://github.com/airbnb/react-sketchapp/issues) to find a list of open issues that need attention.

Fork, then clone the repo
```bash
git clone https://github.com/your-username/react-sketchapp.git
```

### Setting up your environment

### Testing, style & Linting
To run tests
```bash
npm run test
```

To run tests continuously
```bash
npm run test:watch
```

This codebase adheres to the [Airbnb Styleguide](https://github.com/airbnb/javascript) and is enforced using [ESLint](http://eslint.org/).

It is recommended that you install an eslint plugin for your editor of choice when working on this codebase, however you can always check to see if the source code is compliant by running:

```bash
npm run lint
```

It is also type-checked with [Flow](https://flow.org/) - run with
```bash
npm run flow
```

### Docs
We always appreciate improvements to the documentation!

#### Installing Gitbook

To install the latest version of `gitbook` and prepare to build the documentation, run the following:

```
npm run docs:prepare
```

#### Building the Docs

To build the documentation, run the following:

```
npm run docs:build
```

To watch and rebuild documentation when changes occur, run the following:

```
npm run docs:watch
```

The docs will be served at http://localhost:4000.

#### Publishing the Docs

To publish the documentation, run the following:

```
npm run docs:publish
```

### Sending a Pull Request

For non-trivial changes, please open an issue with a proposal for a new feature or refactoring before starting work — we don't want you to waste your time on a pull request that won't be accepted.

On the other hand, sometimes the best way to start a discussion _is_ to send a pull request. Use your judgement!

In general, the contribution workflow looks like this:

* Open a new issue in the [Issue tracker](https://github.com/airbnb/react-sketchapp/issues).
* Fork the repo.
* Create a new feature branch based off the `master` branch.
* Make sure all tests pass and there are no linting errors.
* Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!
