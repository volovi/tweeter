FROM ruby:3.1.2-alpine as base
RUN apk --no-cache add postgresql-dev \
  tzdata \
  gcompat

FROM base as builder
RUN apk --no-cache add build-base
WORKDIR /myapp
COPY Gemfile Gemfile.lock ./

FROM builder as dev
RUN bundle install && rm -rf /usr/local/bundle/cache/
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

FROM builder as prod-build
RUN bundle config set --local without 'development test'
RUN bundle install && rm -rf /usr/local/bundle/cache/
COPY . .
RUN bundle exec rails assets:precompile

FROM base as prod
WORKDIR /myapp
COPY --from=prod-build /usr/local/bundle/ /usr/local/bundle/
COPY --from=prod-build /myapp/ /myapp/
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
